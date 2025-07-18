import { getVideoById, getVideos } from "../daos/video.dao.js"
import { addComment, deleteComment, getCommentById, getCommentsByVideoId } from "../daos/comments.dao.js";
import { addLike, isLiked, removeLike } from "../daos/likes.dao.js";
import jwt from "jsonwebtoken";

export const getVideoService = async (token, videoId) => {
    const video = await getVideoById(videoId);
    if (!video) {
        return {
            success: false,
            message: "no video with the given videoId",
        }
    }
    video.comments = await getCommentsByVideoId(videoId); //comments is an array
    if (token === undefined) {
        console.log("token not there while sending video");
        video.isLiked = false;
    } else {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        video.isLiked = await isLiked(decoded._id, videoId);
    }
    return {
        success: true,
        message: "video details fetched successfully",
        video: video,
    }
}

export const addCommentService = async (userId, videoId, comment) => {
    return await addComment(userId, videoId, comment);
}

export const deleteCommentService = async (userId, commentId) => {
    const comment = await getCommentById(commentId);
    if (comment.userId != userId) {
        return {
            success: false,
            message: "This is not your comment to delete",
        };
    } else {
        await deleteComment(commentId);
        return {
            success: true,
            message: "Comment deleted successfully"
        }
    }
}

export const toggleLikeService = async (userId, videoId) => {
    const b = isLiked(userId, videoId);
    if (b) {
        removeLike(userId, videoId);
        return {
            success: true,
            message: "Liked successfully",
        }
    } else {
        addLike(userId, videoId);
        return {
            success: true,
            message: "Unliked successfully",
        }
    }
}

export const getVideosService = async (pageNo) => {
    const limit =20;
    const videos=await getVideos(pageNo);
    return {
        success:true,
        videos:videos,
        hasNext:(videos.length>limit),
    }
}