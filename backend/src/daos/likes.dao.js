import Likes from "../models/Likes.js";

export const isLiked = async (userId, videoId) => {
    const like = await Likes.findOne({ user: userId, video: videoId });
    if (like) {
        return true;
    } else {
        return false;
    }
};

export const addLike = async (userId, videoId) => {
    const newLike = new Likes({
        user: userId,
        video: videoId,
    });
    await newLike.save();
    return;
}

export const removeLike=async (userId,videoId)=>{
    await Likes.findOneAndDelete({user:userId,video:videoId});
    return;
}