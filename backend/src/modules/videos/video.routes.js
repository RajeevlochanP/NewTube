import express from "express";
import { initiateUpload, getFeed, getVideoDetails } from "./video.controller.js";
import { protect } from "../../middlewares/protect.js";

const router = express.Router();

// Public routes
router.get("/feed", getFeed);
router.get("/:videoId", getVideoDetails);

// Protected routes
router.post("/upload/initiate", protect, initiateUpload);

export default router;