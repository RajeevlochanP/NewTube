import { getVideoById } from "../daos/video.dao.js"
import { addComment, deleteComment, getCommentById, getCommentsByVideoId } from "../daos/comments.dao.js";
import { addLike, isLiked, removeLike } from "../daos/likes.dao.js";

export const getVideoService = async (videoId) => {
    const video = await getVideoById(videoId);
    video.comments = await getCommentsByVideoId(videoId); //comments is an array
    return video;
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

export const toggleLikeService = async (userId,videoId)=>{
    const b=isLiked(userId,videoId);
    if(b){
        removeLike(userId,videoId);
        return {
            success:true,
            message:"Liked successfully",
        }
    }else{
        addLike(userId,videoId);
        return {
            success:true,
            message:"Unliked successfully",
        }
    }
}