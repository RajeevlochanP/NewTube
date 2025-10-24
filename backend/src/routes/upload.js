import express from "express";
import { upload } from "../middlewares/upload.js"
import { handleUpload } from "../controllers/upload.controller.js";
import {
    checkToken,
    requireUser,
} from "../middlewares/protect.js";
import {
    toggleLike,
    addComment,
    deleteComment,
} from "../controllers/upload.controller.js"

const router = express.Router();

router.post("/video", checkToken, requireUser, upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
]), handleUpload);
//in future
//router.post("/profile")


router.post("addComment/:videoId", checkToken, requireUser, addComment);
router.post("deleteComment/:commentId", checkToken, requireUser, deleteComment);

router.post("/toggleLike/:videoId", checkToken, requireUser, toggleLike);


export default router;