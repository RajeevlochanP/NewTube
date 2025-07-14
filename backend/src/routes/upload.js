import express from "express";
import multer from "multer";
import { handleUpload } from "../controllers/upload.controller";

const router=express.Router();

router.post("/video",authMiddleWare,upload.single("video"),handleUpload);
//in future
//router.post("/profile")