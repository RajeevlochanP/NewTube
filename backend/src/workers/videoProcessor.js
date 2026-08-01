import { Worker } from "bullmq";
import ffmpeg from "fluent-ffmpeg";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { redisConnection } from "../config/redis.config.js";
import { downloadFromS3, uploadToS3, deleteFromS3 } from "../utils/s3.util.js";
import { updateVideoRecord } from "../modules/videos/video.dao.js";

const generateThumbnail = (inputPath, folderPath) => {
  return new Promise((resolve) => {
    ffmpeg(inputPath)
      .screenshots({
        timestamps: ["00:00:01.000"],
        filename: "thumbnail.jpg",
        folder: folderPath,
        size: "640x360",
      })
      .on("end", () => resolve(path.join(folderPath, "thumbnail.jpg")))
      .on("error", (err) => {
        console.warn("[VideoProcessor] Screenshot at 1s failed, retrying at 0s:", err.message);
        ffmpeg(inputPath)
          .screenshots({
            timestamps: ["00:00:00.000"],
            filename: "thumbnail.jpg",
            folder: folderPath,
            size: "640x360",
          })
          .on("end", () => resolve(path.join(folderPath, "thumbnail.jpg")))
          .on("error", () => resolve(null));
      });
  });
};

const transcodeToHLS = (inputPath, outputFolder) => {
  const masterPath = path.join(outputFolder, "master.m3u8");

  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .outputOptions([
        // 1. Map the original video and audio to 3 separate streams
        "-map 0:v:0", "-map 0:a:0", 
        "-map 0:v:0", "-map 0:a:0", 
        "-map 0:v:0", "-map 0:a:0", 

        // 2. Configure Stream 0 (1080p Height, Auto Width, Square Pixels)
        "-filter:v:0 scale=-2:1080,setsar=1", "-c:v:0 libx264", "-b:v:0 3000k",

        // 3. Configure Stream 1 (720p Height, Auto Width, Square Pixels)
        "-filter:v:1 scale=-2:720,setsar=1", "-c:v:1 libx264", "-b:v:1 1500k",

        // 4. Configure Stream 2 (360p Height, Auto Width, Square Pixels)
        "-filter:v:2 scale=-2:360,setsar=1", "-c:v:2 libx264", "-b:v:2 500k",

        // 5. Audio settings (applied to all)
        "-c:a aac", "-b:a 128k",

        // 6. HLS Configuration
        "-f hls",
        "-hls_time 6",
        "-hls_list_size 0",
        "-hls_segment_filename", path.join(outputFolder, "stream_%v_data%03d.ts"),
        "-master_pl_name", "master.m3u8",
        "-var_stream_map", "v:0,a:0 v:1,a:1 v:2,a:2"
      ])
      .output(path.join(outputFolder, "stream_%v.m3u8"))
      .on("end", () => resolve(masterPath))
      .on("error", (err) => reject(err))
      .run();
  });
};

export const startVideoWorker = () => {
  console.log("[VideoProcessor] Starting BullMQ worker on queue 'video-transcode-queue'...");

  const worker = new Worker(
    "video-transcode-queue",
    async (job) => {
      const { videoId, s3RawKey } = job.data;
      console.log(`[VideoProcessor] Processing job ${job.id} for Video ID: ${videoId}`);

      const workDir = path.join(os.tmpdir(), "newtube-work", videoId);
      await fs.mkdir(workDir, { recursive: true });

      try {
        // Step 1: Update DB status to processing
        await updateVideoRecord(videoId, { status: "processing" });

        // Step 2: Download raw mp4 from S3
        const rawPath = path.join(workDir, "raw.mp4");
        console.log(`[VideoProcessor] Downloading raw video from S3: ${s3RawKey}`);
        await downloadFromS3(s3RawKey, rawPath);

        // Step 3: Generate thumbnail
        console.log(`[VideoProcessor] Generating thumbnail...`);
        await generateThumbnail(rawPath, workDir);

        // Step 4: Transcode to HLS
        console.log(`[VideoProcessor] Transcoding video to HLS...`);
        await transcodeToHLS(rawPath, workDir);

        // Step 5: Upload generated HLS files and thumbnail to S3
        console.log(`[VideoProcessor] Uploading HLS files and thumbnail to S3...`);
        const files = await fs.readdir(workDir);
        let masterS3Url = null;
        let thumbnailS3Url = null;

        for (const file of files) {
          if (file === "raw.mp4") continue;
          const localFilePath = path.join(workDir, file);
          const stat = await fs.stat(localFilePath);
          if (stat.isFile()) {
            let mimeType = "application/octet-stream";
            if (file.endsWith(".m3u8")) mimeType = "application/vnd.apple.mpegurl";
            else if (file.endsWith(".ts")) mimeType = "video/MP2T";
            else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) mimeType = "image/jpeg";

            const s3Key = file === "thumbnail.jpg" ? `thumbnails/${videoId}.jpg` : `hls/${videoId}/${file}`;
            const s3Url = await uploadToS3(localFilePath, s3Key, mimeType);

            if (file === "master.m3u8") masterS3Url = s3Url;
            if (file === "thumbnail.jpg") thumbnailS3Url = s3Url;
          }
        }

        // Step 6: Update DB record with ready status and S3 URLs
        console.log(`[VideoProcessor] Updating DB record to ready...`);
        await updateVideoRecord(videoId, {
          status: "ready",
          m3u8Path: masterS3Url,
          thumbnailPath: thumbnailS3Url || null,
          folderPath: `hls/${videoId}`,
        });

        // Step 7: Delete raw mp4 from S3
        console.log(`[VideoProcessor] Deleting raw file from S3: ${s3RawKey}`);
        await deleteFromS3(s3RawKey);

        console.log(`[VideoProcessor] Successfully completed processing for Video ID: ${videoId}`);
        return { success: true, videoId };
      } catch (error) {
        console.error(`[VideoProcessor] Error processing Video ID ${videoId}:`, error);
        await updateVideoRecord(videoId, { status: "failed" });
        throw error;
      } finally {
        // Step 8: Clean up local temp files
        await fs.rm(workDir, { recursive: true, force: true }).catch((e) => {
          console.warn(`[VideoProcessor] Error removing temp folder ${workDir}:`, e.message);
        });
      }
    },
    {
      connection: redisConnection,
      concurrency: 2,
    }
  );

  worker.on("failed", (job, err) => {
    console.error(`[VideoProcessor] Job ${job?.id} failed with error:`, err.message);
  });

  return worker;
};
