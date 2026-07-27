import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

// Initialize the S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION, // e.g., 'ap-south-2'
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export const uploadToS3 = async (localFilePath, s3Key, mimeType) => {
  const fileStream = fs.createReadStream(localFilePath);
  
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: s3Key, // e.g., 'videos/12345/master.m3u8'
    Body: fileStream,
    ContentType: mimeType,
  });

  await s3.send(command);
  
  // Return the public URL
  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;
};