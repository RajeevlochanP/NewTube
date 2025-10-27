import Likes from "../models/Likes.js";

export const isLiked = async (userId, videoId) => {
    const like = await Likes.findOne({ user: userId, video: videoId });
    console.log(like);
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
    console.log(videoId,userId)
    await Likes.findOneAndDelete({user:userId,video:videoId});
    return;
}

export const getLikedVideosByUser = async (userId) => {
  const likedVideos = await Likes.find({ user: userId })
    .populate({
      path: 'video',
      populate: {
        path: 'uploadedBy',
      },
    })
    .lean();
  return likedVideos.map(like => like.video);
};