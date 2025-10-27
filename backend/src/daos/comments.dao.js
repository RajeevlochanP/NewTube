import Comments from "../models/Comments.js";

export const getCommentsByVideoId = async (videoId) => {
  return await Comments.find({ videoId })
    .populate('userId')
    .sort({ commentedAt: -1 })
    .lean();  
};

export const getCommentById = async (commentId) => {
  return await Comments.findById(commentId);
};

export const addComment=async (userId,videoId,comment)=>{
    const newComment=Comments({
        userId:userId,
        videoId:videoId,
        comment:comment,
    });
    return (await newComment.save()).populate('userId');
}

export const deleteComment=async (commentId)=>{
    await Comments.findByIdAndDelete(commentId);
    return;
}