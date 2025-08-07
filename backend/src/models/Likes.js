import mongoose from "mongoose";
import Video from "./Video.js"
const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },
    video: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
        required: true,
        index: true,
    },
    likedAt: {
        type: Date,
        default: Date.now,
    },
});

likeSchema.index({ user: 1, video: 1 }, { unique: true });

//hooks for incrementing and decrementing Videos number of likes
likeSchema.post("save", async function (doc, next) {
    await Video.findByIdAndUpdate(doc.video, { $inc: { likesCount: 1 } });
    next();
});
likeSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        await Video.findByIdAndUpdate(doc.video, { $inc: { likesCount: -1 } });
    }
});

export default mongoose.model("Likes",likeSchema);