import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/mongo.config.js";

import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import videoRoutes from "./modules/videos/video.routes.js";
import interactionRoutes from "./modules/interactions/interaction.routes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

connectDB();

// API Routes ONLY. No workers started here.
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/interactions", interactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
});
