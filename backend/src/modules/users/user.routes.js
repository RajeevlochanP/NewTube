import express from "express";
import { getMe } from "./user.controller.js";
import { protect } from "../../middlewares/protect.js";

const router = express.Router();

router.use(protect);

router.get("/me", getMe);

export default router;