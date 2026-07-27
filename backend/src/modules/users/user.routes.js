import express from "express";
import { getMe, getMyVideos } from "./user.controller.js";
import { protect } from "../../middlewares/protect.js";

const router = express.Router();

router.use(protect);

router.get("/me", getMe);
router.get("/me/videos", getMyVideos);

export default router;