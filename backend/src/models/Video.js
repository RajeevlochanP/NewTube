import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  originalName: String,
  mimeType: String,
  size: Number,
  uploadTime: { type: Date, default: Date.now, required: true },

  m3u8Path: String,
  s3RawKey: String,
  folderPath: String,
  description: String,

  // link to user
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true, // for O(logn) search time for a specific user
  },
  visibility: {
    type: String,
    enum: ["public", "private"],
    default: "public",
  },
  likesCount: {
    type: Number,
    default: 0,
    required: true,
  },
  commentsCount: {
    type: Number,
    default: 0,
    index: true,
    required: true,
  },
  thumbnailPath: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ["uploading", "processing", "ready", "failed"],
    default: "uploading",
    required: true,
  },
});

export default mongoose.model("Video", videoSchema);