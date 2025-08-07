import express from "express";
import { sendVideo, toggleLike } from "../controllers/stream.controller.js"
import { checkToken, requireUser } from "../middlewares/protect.js";
import {
    addComment,
    deleteComment,
    sendVideos,
    sendMasterManifest,
    sendManifest,
    sendSegment,
} from "../controllers/stream.controller.js";

const router = express.Router();

router.get("/videos/:pageNo",sendVideos);

router.get("/video/:videoId", sendVideo);

router.get("/masterManifest/:videoId",sendMasterManifest); //check whether the requester is allowed or not then rewrite it and send
router.get("/manifest",sendManifest); //validate token and reqrite the output.m3u8 and send it
router.get("/segment",sendSegment); //validate token and send the sengment file

router.post("addComment/:videoId",checkToken,requireUser,addComment);
router.post("deleteComment/:commentId",checkToken,requireUser,deleteComment);

router.post("/toggleLike/:videoId",checkToken,requireUser,toggleLike);

export default router;