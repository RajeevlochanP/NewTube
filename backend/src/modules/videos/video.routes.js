import express from "express";
import { initiateUpload, getFeed, getVideoDetails,getVideosByUser } from "./video.controller.js";
import { protect } from "../../middlewares/protect.js";

const router = express.Router();

// Public routes
router.get("/feed", getFeed);
router.get("/:videoId", getVideoDetails);

// Protected routes
router.post("/upload/initiate", protect, initiateUpload);
router.get("/user", protect, getVideosByUser);

export default router;