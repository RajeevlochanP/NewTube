import { Queue } from "bullmq";
import { redisConnection } from "../../config/redis.config.js";
import { generatePresignedUrl } from "../../utils/s3.util.js";
import {
  createVideoRecord,
  getPublicVideosPaginated,
  getVideoById,
  findCommentsForVideo,
  checkUserLikedVideo,
} from "./video.dao.js";

// Initialize BullMQ Queue for video transcoding jobs
export const videoQueue = new Queue("video-transcode-queue", {
  connection: redisConnection,
});

export const initiateUploadService = async (userId, { title, description, visibility, originalName, mimeType, size }) => {
  if (!title) {
    return { success: false, status: 400, message: "Title is required" };
  }

  // Create a DB record first to generate the ObjectId
  const initialVideo = await createVideoRecord({
    title,
    description: description || "",
    visibility: visibility || "public",
    originalName: originalName || "video.mp4",
    mimeType: mimeType || "video/mp4",
    size: size || 0,
    uploadedBy: userId,
    status: "uploading",
  });

  const videoId = initialVideo._id.toString();
  const s3RawKey = `raw-uploads/${videoId}.mp4`;

  // Update DB record with s3RawKey
  initialVideo.s3RawKey = s3RawKey;
  await initialVideo.save();

  // Generate S3 presigned URL
  const { presignedUrl, publicUrl } = await generatePresignedUrl(s3RawKey, mimeType || "video/mp4");

  return {
    success: true,
    status: 201,
    videoId,
    presignedUrl,
    publicUrl,
    s3Key: s3RawKey,
    message: "Upload initiated successfully. Use presignedUrl to PUT the file to S3.",
  };
};

export const getPublicFeedService = async (pageNo = 0) => {
  const limit = 20;
  const videos = await getPublicVideosPaginated(pageNo, limit);
  const hasNext = videos.length > limit;
  const resultVideos = hasNext ? videos.slice(0, limit) : videos;

  return {
    success: true,
    status: 200,
    videos: resultVideos,
    hasNext,
  };
};

export const getVideoDetailsService = async (videoId, userId = null) => {
  const video = await getVideoById(videoId);
  if (!video) {
    return { success: false, status: 404, message: "Video not found" };
  }

  // If private and not uploaded by this user, deny access
  if (video.visibility === "private" && (!userId || video.uploadedBy._id.toString() !== userId.toString())) {
    return { success: false, status: 403, message: "This video is private" };
  }

  const comments = await findCommentsForVideo(videoId);
  const isLiked = await checkUserLikedVideo(userId, videoId);

  return {
    success: true,
    status: 200,
    video: {
      ...video,
      comments,
      isLiked,
    },
  };
};