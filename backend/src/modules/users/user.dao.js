import User from "../../models/User.js";
import Video from "../../models/Video.js";

export const findUserById = async (userId) => {
  return await User.findById(userId, "-password").lean();
};

export const findVideosByUserId = async (userId) => {
  return await Video.find({ uploadedBy: userId })
    .populate("uploadedBy", "name email")
    .sort({ uploadTime: -1 })
    .lean();
};