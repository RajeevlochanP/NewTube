import {
  findLike,
  createLike,
  deleteLike,
  findCommentById,
  createComment,
  deleteCommentById,
} from "./interaction.dao.js";

export const toggleLikeService = async (userId, videoId) => {
  const existingLike = await findLike(userId, videoId);
  if (existingLike) {
    await deleteLike(userId, videoId);
    return { success: true, status: 200, liked: false, message: "Unliked successfully" };
  } else {
    await createLike(userId, videoId);
    return { success: true, status: 200, liked: true, message: "Liked successfully" };
  }
};

export const addCommentService = async (userId, videoId, commentText) => {
  if (!commentText || commentText.trim().length === 0) {
    return { success: false, status: 400, message: "Comment text cannot be empty" };
  }
  const comment = await createComment(userId, videoId, commentText);
  return { success: true, status: 201, comment, message: "Comment added successfully" };
};

export const deleteCommentService = async (userId, commentId) => {
  const comment = await findCommentById(commentId);
  if (!comment) {
    return { success: false, status: 404, message: "Comment not found" };
  }
  if (comment.userId.toString() !== userId.toString()) {
    return { success: false, status: 403, message: "You are not authorized to delete this comment" };
  }
  await deleteCommentById(commentId);
  return { success: true, status: 200, message: "Comment deleted successfully" };
};
