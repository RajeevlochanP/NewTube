import express from "express";
import { toggleLike, addComment, deleteComment } from "./interaction.controller.js";
import { protect } from "../../middlewares/protect.js";

const router = express.Router();

router.use(protect);

router.post("/likes/:videoId", toggleLike);
router.post("/comments/:videoId", addComment);
router.delete("/comments/:commentId", deleteComment);

export default router;
