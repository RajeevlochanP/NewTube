import mongoose from "mongoose";
import Video from "./Video.js";

const commentSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
    required: true,
    index: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  commentedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

commentSchema.index({ videoId: 1, commentedAt: -1 });

commentSchema.post("save", async function (doc) {
  await Video.findByIdAndUpdate(doc.videoId, {
    $inc: { commentsCount: 1 },
  });
});

commentSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Video.findByIdAndUpdate(doc.videoId, {
      $inc: { commentsCount: -1 },
    });
  }
});

const Comments = mongoose.model("Comments", commentSchema);

export default Comments;
