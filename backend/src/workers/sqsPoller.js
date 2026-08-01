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
        WaitTimeSeconds: 20,
      });

      const { Messages } = await sqs.send(command);

      if (Messages) {
        for (const message of Messages) {
          try {
            const body = JSON.parse(message.Body);

            if (body.Records && body.Records[0].eventName.includes("ObjectCreated")) {
              const s3Key = decodeURIComponent(body.Records[0].s3.object.key.replace(/\+/g, " "));

              const fileName = s3Key.split("/").pop();
              const videoId = fileName.split(".")[0];

              console.log(`[SQS Poller] S3 Upload detected for Video ID: ${videoId}, S3 Key: ${s3Key}`);

              await videoQueue.add("transcode-from-s3", {
                videoId,
                s3RawKey: s3Key,
              });
            }
          } catch (msgErr) {
            console.error("[SQS Poller] Error processing individual message:", msgErr);
          } finally {
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
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
};