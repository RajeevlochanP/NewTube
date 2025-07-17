import express from "express";
import { sendVideo, toggleLike } from "../controllers/stream.controller.js"
import { checkToken, requireUser } from "../middlewares/protect.js";
import { addComment,deleteComment } from "../controllers/stream.controller.js";

const router = express.Router();

router.get("/:videoId", sendVideo);

router.post("addComment/:videoId",checkToken,requireUser,addComment);
router.post("deleteComment/:commentId",checkToken,requireUser,deleteComment);

router.post("/toggleLike/:videoId",checkToken,requireUser,toggleLike);

export default router;