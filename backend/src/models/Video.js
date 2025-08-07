import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  originalName: String,
  mimeType: String,
  size: Number,
  uploadTime: { type: Date, default: Date.now, required:true },

  m3u8Path: String,
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
    enum:["public","private"],
  },
  likesCount: {
    type: Number,
    default: 0,
    index: true, // optional for sorting most liked
    required: true,
  },
  genre:[
    {
      type: String,
      enum:["adventure","comedy","crimeAndMystery","fantasy","historical","horror","romance","satire","scienceFiction","speculative","thriller","isekai"],
    },
  ],
});

export default mongoose.model("Video", videoSchema);