import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  originalName: String,
  mimeType: String,
  size: Number,
  uploadTime: { type: Date, default: Date.now, required: true },

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
    enum: ["public", "private"],
  },
  likesCount: {
    type: Number,
    default: 0,
    index: true, // optional for sorting most liked
    required: true,
  },
  commentsCount: {
    type: Number,
    default: 0,
    index: true,
    required: true,
  },
  genre: [
    {
      type: String,
      enum: ['Education',
        'Entertainment',
        'Music',
        'Gaming',
        'Technology',
        'Sports',
        'News',
        'Comedy',
        'Travel',
        'Food',
        'Lifestyle',
        'Science',
        'Art',
        'Documentary',
        'Other'],
    },
  ],
  thumbnailPath: {
    type: String,
    required: true,
    default: null,
  },
});

export default mongoose.model("Video", videoSchema);