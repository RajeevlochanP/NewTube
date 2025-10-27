import path from "path";
import {
    addVideoDao,
    getMyVideos,
} from "../daos/video.dao.js";
import {
    segmentToHLS,
} from "../utils/ffmpeg.js"
import {
    addComment,
    deleteComment,
    getCommentById,
} from "../daos/comments.dao.js";
import {
    addLike,
    isLiked,
    removeLike,
    getLikedVideosByUser,
} from "../daos/likes.dao.js";
import {
    getUserById,
} from "../daos/user.dao.js";

export const handleUploadService = async (storedFileName, uniqueFolderPath, file, title, description, userId, visibility, genre, thumbnailFile) => {
    const inputPath = path.join(uniqueFolderPath, storedFileName);
    const masterM3U8 = await segmentToHLS(inputPath, uniqueFolderPath);
    console.log(thumbnailFile.path);
    return await addVideoDao(file, title, description, masterM3U8, uniqueFolderPath, userId, visibility, genre, thumbnailFile.path);
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
    const b = await isLiked(userId, videoId);
    if (b) {
        removeLike(userId, videoId);
        return {
            liked: false,
            success: true,
            message: "Unliked successfully",
        }
    } else {
        addLike(userId, videoId);
        return {
            liked: true,   
            success: true,
            message: "Liked successfully",
        }
    }
}

export const getMyVideosService = async (userId) => {
    try {
        const videos = await getMyVideos(userId);
        return {
            success: true,
            videos
        }
    } catch (error) {
        return {
            status: 500,
            success: false,
            message: error.message
        }
    }
}

export const getMyDetailsService = async (userId) => {
    const userDetails = await getUserById(userId);
    if(!userDetails){
        return {
            success: false,
            status:404,
            message: "User not found",
        }
    }
    return {
        success: true,
        userDetails,
    }
}

export const getLikedDetailsService = async (userId) => {
    try {
        const likedVideos = await getLikedVideosByUser(userId);
        return {
            success: true,
            likedVideos,
        }
    } catch (error) {
        return {
            status: 500,
            success: false,
            message: error.message
        }
    }
}