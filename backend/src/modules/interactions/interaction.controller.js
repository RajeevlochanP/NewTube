import { toggleLikeService, addCommentService, deleteCommentService } from "./interaction.service.js";

export const toggleLike = async (req, res) => {
  try {
    const { videoId } = req.params;
    if (!videoId) {
      return res.status(400).json({ success: false, error: "videoId parameter is required" });
    }
    const response = await toggleLikeService(req.user._id, videoId);
    return res.status(response.status).json({
      success: true,
      liked: response.liked,
      message: response.message,
    });
  } catch (err) {
    console.error("Toggle Like Error:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { comment } = req.body;
    if (!videoId) {
      return res.status(400).json({ success: false, error: "videoId parameter is required" });
    }
    const response = await addCommentService(req.user._id, videoId, comment);
    if (!response.success) {
      return res.status(response.status).json({ success: false, error: response.message });
    }
    return res.status(response.status).json({
      success: true,
      comment: response.comment,
      message: response.message,
    });
  } catch (err) {
    console.error("Add Comment Error:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    if (!commentId) {
      return res.status(400).json({ success: false, error: "commentId parameter is required" });
    }
    const response = await deleteCommentService(req.user._id, commentId);
    if (!response.success) {
      return res.status(response.status).json({ success: false, error: response.message });
    }
    return res.status(response.status).json({
      success: true,
      message: response.message,
    });
  } catch (err) {
    console.error("Delete Comment Error:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};
