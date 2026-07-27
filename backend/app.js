import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./src/config/mongo.config.js";
import authRouter from "./src/modules/auth/auth.routes.js";
import userRouter from "./src/modules/users/user.routes.js";
import videoRouter from "./src/modules/videos/video.routes.js";
import interactionRouter from "./src/modules/interactions/interaction.routes.js";
import { startSQSPoller } from "./src/workers/sqsPoller.js";
import { startVideoWorker } from "./src/workers/videoProcessor.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
await connectDB();

// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Mount 3-Layer DDD Routes
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/interactions", interactionRouter);

// Start Background Workers
try {
  startSQSPoller();
  startVideoWorker();
} catch (workerErr) {
  console.warn("Notice: Background workers could not start:", workerErr.message);
}

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});