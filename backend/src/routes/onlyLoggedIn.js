import express from "express";
import { upload } from "../middlewares/upload.js"
import { handleUpload } from "../controllers/onlyLoggedIn.controller.js";
import {
    checkToken,
    requireUser,
} from "../middlewares/protect.js";
import {
    toggleLike,
    addComment,
    deleteComment,
    getMyVideos,
    getMyDetails,
    getLikedDetails,
} from "../controllers/onlyLoggedIn.controller.js"

const router = express.Router();

router.use(checkToken);
router.use(requireUser);

router.post("/video", upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
]), handleUpload);
//in future
//router.post("/profile")


router.post("/addComment/:videoId", addComment);
router.delete("/deleteComment/:commentId", deleteComment);

router.patch("/toggleLike/:videoId", toggleLike);


// for profile and library pages
router.get('/myVideos', getMyVideos);
router.get("/myDetails", getMyDetails);
router.get("/likedVideos", getLikedDetails);


export default router;