import Likes from "../models/Likes.js";

export const addLike = async (userId, videoId) => {
    const newLike=new Likes({
        user:userId,
        video:videoId,
    });
    await newLike.save();
}