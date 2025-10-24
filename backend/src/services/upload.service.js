import path from "path";
import { addVideoDao } from "../daos/video.dao.js";
import { segmentToHLS } from "../utils/ffmpeg.js"
import {
    addComment,
    deleteComment,
    getCommentById,
} from "../daos/comments.dao.js";
import {
    addLike,
    isLiked,
    removeLike,
} from "../daos/likes.dao.js";

export const handleUploadService = async (storedFileName, uniqueFolderPath, file, title,description,userId,visibility,genre,thumbnailFile) => {
    const inputPath = path.join(uniqueFolderPath, storedFileName);
    const masterM3U8 = await segmentToHLS(inputPath, uniqueFolderPath);
    console.log(thumbnailFile.path);
    return await addVideoDao(file,title,description,masterM3U8,uniqueFolderPath,userId,visibility,genre,thumbnailFile.path);
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