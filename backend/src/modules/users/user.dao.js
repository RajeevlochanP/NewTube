import User from "../../models/User.js";

export const findUserById = async (userId) => {
  return await User.findById(userId, "-password").lean();
};