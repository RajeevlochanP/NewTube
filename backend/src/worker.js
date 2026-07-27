import dotenv from "dotenv";
import connectDB from "./config/mongo.config.js";
import { startSQSPoller } from "./workers/sqsPoller.js";
import { startVideoWorker } from "./workers/videoProcessor.js";

dotenv.config();

connectDB().then(() => {
    console.log("Database connected for Workers");
    startSQSPoller();
    startVideoWorker();
});
