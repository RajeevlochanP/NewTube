import express from "express";
import {login,signup} from "../controllers/auth.controller.js";
import { checkToken, requireUser } from "../middlewares/protect.js";

const router = express.Router();

router.post("/login",login);
router.post("/signup",signup);
router.post("/test",checkToken,requireUser,(req,res)=>{
    console.log(req.user);
    res.status(200).json("done..");
});
// router.post("/logout",logout);

export default router;