import express from "express";
import jwt from "jsonwebtoken";
import { connectDB } from "./src/config/mongo.config.js";
import cors from "cors";
import cookieParser from 'cookie-parser';
import path from "node:path";
import { fileURLToPath } from "node:url";
import uploadRouter from "./src/routes/upload.js";
import authRouter from "./src/routes/auth.js";
import streamRouter from "./src/routes/stream.js";
const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await connectDB();

// body Parsing middleware
app.use(cookieParser());
app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
}));
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true, limit: "500mb" }));

// Static files
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//sending to corresponding router
app.use("/upload",uploadRouter);
app.use("/auth",authRouter);
app.use("/stream",streamRouter);

app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`);
});