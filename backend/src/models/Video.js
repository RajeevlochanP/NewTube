import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  originalName: String,
  mimeType: String,
  size: Number,
  uploadTime: { type: Date, default: Date.now },

  m3u8Path: String,
  folderPath: String,

  description: String,

  // link to user
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true, // for O(logn) search time for a specific user
  },
});

export default mongoose.model("Video", videoSchema);