import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "node:fs";
import { pipeline } from "node:stream/promises";

// Initialize the S3 Client cleanly
const s3Config = {
  region: process.env.AWS_REGION || "eu-north-1",
};

if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
  s3Config.credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  };
}

export const s3 = new S3Client(s3Config);

export const generatePresignedUrl = async (s3Key, contentType) => {
  const bucketName = process.env.AWS_S3_BUCKET_NAME || "newtube-bucket";
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: s3Key,
    ContentType: contentType,
  });

  const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
  const publicUrl = `https://${bucketName}.s3.${s3Config.region}.amazonaws.com/${s3Key}`;
  
  return { presignedUrl, publicUrl, s3Key };
};


export const uploadToS3 = async (localFilePath, s3Key, mimeType) => {
  const bucketName = process.env.AWS_S3_BUCKET_NAME || "newtube-bucket";
  const fileStream = fs.createReadStream(localFilePath);
  
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: s3Key,
    Body: fileStream,
    ContentType: mimeType,
  });

  await s3.send(command);
  
  return `https://${bucketName}.s3.${s3Config.region}.amazonaws.com/${s3Key}`;
};

export const downloadFromS3 = async (s3Key, localFilePath) => {
  const bucketName = process.env.AWS_S3_BUCKET_NAME || "newtube-bucket";
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: s3Key,
  });

  const response = await s3.send(command);
  const writeStream = fs.createWriteStream(localFilePath);
  await pipeline(response.Body, writeStream);
  return localFilePath;
};

export const deleteFromS3 = async (s3Key) => {
  const bucketName = process.env.AWS_S3_BUCKET_NAME || "newtube-bucket";
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: s3Key,
  });

  await s3.send(command);
};