import express from "express";
import { sendVideo } from "../controllers/stream.controller.js"
import { checkToken, requireUser } from "../middlewares/protect.js";
import {
    sendVideos,
    sendMasterManifest,
    sendManifest,
    sendSegment,
    getMyVideos
} from "../controllers/stream.controller.js";

const router = express.Router();

router.get("/videos/:pageNo",sendVideos);

router.get("/video/:videoId", sendVideo);

router.get("/masterManifest/:videoId",sendMasterManifest); //check whether the requester is allowed or not then rewrite it and send
router.get("/manifest",sendManifest); //validate token and reqrite the output.m3u8 and send it
router.get("/segment",sendSegment); //validate token and send the sengment file



router.get('myvideos',checkToken,requireUser,getMyVideos);
// Yet to implement :-
// Liked Videos
// Watch later videos
export default router;