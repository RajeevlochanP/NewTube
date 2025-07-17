import { addCommentService, deleteCommentService, getVideoService,toggleLikeService } from "../services/stream.service.js"
export const sendVideo = async (req, res) => {
    const { videoId } = req.params;
    if (!videoId) {
        return res.status(400).json({
            error: "videoId is not coming",
        });
    }
    const token = req.cookies.token;
    const response =await getVideoService(token,videoId);
    if(!response.success){
        return res.status(400).json({
            error: response.message,
        });
    }
    return res.status(200).json({
        message:response.message,
        video: response.video,
    });
}

export const addComment = async (req, res) => {
    const { videoId } = req.params;
    if (!videoId) {
        return res.status(400).json({
            error: "videoId is not coming",
        });
    }
    const { comment } = req.body;
    if (comment.length === 0) {
        return res.status(400).json({
            error: "comment cannot be nothing",
        });
    }
    return await addCommentService(req.user._id, videoId, comment);
}

export const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    if (!commentId) {
        return res.status(400).json({
            error: "commentId is not coming",
        });
    }
    const response = await deleteCommentService(req.user._id, commentId);
    if (!response.success) {
        res.status(400).json({
            error: response.message,
        });
    } else {
        res.status(200).json({
            message: response.message,
        });
    }
}

export const toggleLike = async (req, res) => {
    const { videoId } = req.params;
    if (!videoId) {
        return res.status(400).json({
            error: "videoId is not coming",
        });
    }
    const response = await toggleLikeService(req.user._id,videoId);
    return res.status(200).json({
        message:response.message,
    });
}