import Likes from "../../models/Likes.js";
import Comments from "../../models/Comments.js";

// Likes DAOs
export const findLike = async (userId, videoId) => {
  return await Likes.findOne({ user: userId, video: videoId });
};

export const createLike = async (userId, videoId) => {
  const newLike = new Likes({ user: userId, video: videoId });
  return await newLike.save();
};

export const deleteLike = async (userId, videoId) => {
  return await Likes.findOneAndDelete({ user: userId, video: videoId });
};

// Comments DAOs
export const findCommentById = async (commentId) => {
  return await Comments.findById(commentId);
};

export const createComment = async (userId, videoId, comment) => {
  const newComment = new Comments({ userId, videoId, comment });
  const saved = await newComment.save();
  return await saved.populate("userId", "name email");
};

export const deleteCommentById = async (commentId) => {
  return await Comments.findByIdAndDelete(commentId);
};

export const findCommentsByVideoId = async (videoId) => {
  return await Comments.find({ videoId })
    .populate("userId", "name email")
    .sort({ commentedAt: -1 })
    .lean();
};
