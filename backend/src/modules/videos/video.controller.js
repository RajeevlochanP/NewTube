import jwt from "jsonwebtoken";
import { initiateUploadService, getPublicFeedService, getVideoDetailsService } from "./video.service.js";

export const initiateUpload = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, description, visibility, originalName, mimeType, size } = req.body;
    const response = await initiateUploadService(userId, { title, description, visibility, originalName, mimeType, size });
    if (!response.success) {
      return res.status(response.status).json({ success: false, error: response.message });
    }
    return res.status(response.status).json({
      success: true,
      videoId: response.videoId,
      presignedUrl: response.presignedUrl,
      publicUrl: response.publicUrl,
      s3Key: response.s3Key,
      message: response.message,
    });
  } catch (err) {
    console.error("Initiate Upload Error:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getFeed = async (req, res) => {
  try {
    const pageNo = parseInt(req.query.page || "0", 10);
    if (pageNo < 0 || isNaN(pageNo)) {
      return res.status(400).json({ success: false, error: "Invalid page number" });
    }
    const response = await getPublicFeedService(pageNo);
    return res.status(200).json({
      success: true,
      videos: response.videos,
      hasNext: response.hasNext,
    });
  } catch (err) {
    console.error("Get Feed Error:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getVideoDetails = async (req, res) => {
  try {
    const { videoId } = req.params;
    if (!videoId) {
      return res.status(400).json({ success: false, error: "videoId parameter is required" });
    }

    // Optional auth check from cookie
    let userId = null;
    const token = req.cookies?.token;
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret");
        userId = decoded._id;
      } catch (e) {
        // Token invalid or expired, proceed as anonymous
      }
    }

    const response = await getVideoDetailsService(videoId, userId);
    if (!response.success) {
      return res.status(response.status).json({ success: false, error: response.message });
    }
    return res.status(200).json({
      success: true,
      video: response.video,
    });
  } catch (err) {
    console.error("Get Video Details Error:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};