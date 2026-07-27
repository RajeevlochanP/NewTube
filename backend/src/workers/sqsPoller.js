import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } from "@aws-sdk/client-sqs";
import { videoQueue } from "../modules/videos/video.service.js";

const sqsConfig = {
  region: process.env.AWS_REGION || "eu-north-1",
};

if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
  sqsConfig.credentials = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  };
}

const sqs = new SQSClient(sqsConfig);

const QUEUE_URL = process.env.SQS_QUEUE_URL || process.env.SQS_QUEUE || "https://sqs.eu-north-1.amazonaws.com/436908791457/newtube-upload-queue";

export const startSQSPoller = async () => {
  console.log("[SQS Poller] Listening for S3 upload events...");

  while (true) {
    try {
      const command = new ReceiveMessageCommand({
        QueueUrl: QUEUE_URL,
        MaxNumberOfMessages: 5,
        WaitTimeSeconds: 20, // Long polling
      });

      const { Messages } = await sqs.send(command);

      if (Messages) {
        for (const message of Messages) {
          try {
            const body = JSON.parse(message.Body);

            // Check if this is an S3 ObjectCreated event
            if (body.Records && body.Records[0].eventName.includes("ObjectCreated")) {
              const s3Key = decodeURIComponent(body.Records[0].s3.object.key.replace(/\+/g, " "));

              // Extract videoId from filename, e.g., "raw-uploads/65a1b2c3d4e5f6.mp4" -> "65a1b2c3d4e5f6"
              const fileName = s3Key.split("/").pop();
              const videoId = fileName.split(".")[0];

              console.log(`[SQS Poller] S3 Upload detected for Video ID: ${videoId}, S3 Key: ${s3Key}`);

              // Dispatch to BullMQ for the FFmpeg Worker to handle
              await videoQueue.add("transcode-from-s3", {
                videoId,
                s3RawKey: s3Key,
              });
            }
          } catch (msgErr) {
            console.error("[SQS Poller] Error processing individual message:", msgErr);
          } finally {
            // Delete message so we don't process it twice
            await sqs.send(
              new DeleteMessageCommand({
                QueueUrl: QUEUE_URL,
                ReceiptHandle: message.ReceiptHandle,
              })
            );
          }
        }
      }
    } catch (error) {
      console.error("[SQS Poller] Polling error:", error.message || error);
      // Wait before retrying on failure
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
};