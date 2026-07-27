import { getUserProfileService } from "./user.service.js";

export const getMe = async (req, res) => {
  try {
    const userId = req.user._id;
    const response = await getUserProfileService(userId);
    if (!response.success) {
      return res.status(response.status).json({ success: false, error: response.message });
    }
    return res.status(200).json({
      success: true,
      userDetails: response.userDetails,
    });
  } catch (err) {
    console.error("Get Me Error:", err);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};