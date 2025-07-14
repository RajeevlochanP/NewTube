import { exec } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

export const segmentToHLS = (inputPath, outputFolder) => {
  return new Promise((resolve, reject) => {
    const outputM3U8 = path.join(outputFolder, "output.m3u8");

    fs.mkdirSync(outputFolder, { recursive: true });

    const cmd = `ffmpeg -i "${inputPath}" -profile:v baseline -level 3.0 -start_number 0 -hls_time 6 -hls_list_size 0 -f hls "${outputM3U8}"`; //for 6 sec segments

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error("FFmpeg Error:", error);
        return reject(error);
      }
      return resolve(outputM3U8);
    });
  });
};
