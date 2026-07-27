import { findUserById, findVideosByUserId } from "./user.dao.js";

export const getUserProfileService = async (userId) => {
  const userDetails = await findUserById(userId);
  if (!userDetails) {
    return { success: false, status: 404, message: "User not found" };
  }
  return { success: true, status: 200, userDetails };
};

export const getUserVideosService = async (userId) => {
  const userDetails = await findUserById(userId);
  if (!userDetails) {
    return { success: false, status: 404, message: "User not found" };
  }
  const videos = await findVideosByUserId(userId);
  return { success: true, status: 200, videos };
};