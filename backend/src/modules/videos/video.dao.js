import Video from "../../models/Video.js";
import Comments from "../../models/Comments.js";
import Likes from "../../models/Likes.js";

export const createVideoRecord = async (videoData) => {
  const newVideo = new Video(videoData);
  return await newVideo.save();
};

export const getVideoById = async (videoId) => {
  return await Video.findById(videoId).populate("uploadedBy", "name email").lean();
};

export const getPublicVideosPaginated = async (page = 0, limit = 20) => {
  const videos = await Video.find({ status: "ready", visibility: "public" })
    .populate("uploadedBy", "name email")
    .sort({ uploadTime: -1 })
    .skip(page * limit)
    .limit(limit + 1)
    .lean();
  return videos;
};

export const updateVideoRecord = async (videoId, updateData) => {
  return await Video.findByIdAndUpdate(videoId, updateData, { new: true });
};

export const findCommentsForVideo = async (videoId) => {
  return await Comments.find({ videoId })
    .populate("userId", "name email")
    .sort({ commentedAt: -1 })
    .lean();
};

export const checkUserLikedVideo = async (userId, videoId) => {
  if (!userId) return false;
  const like = await Likes.findOne({ user: userId, video: videoId });
  return !!like;
};