import { get } from "node:http";
import {
    handleUploadService,
    addCommentService,
    deleteCommentService,
    toggleLikeService,
    getMyVideosService,
    getMyDetailsService,
    getLikedDetailsService,
} from "../services/onlyLoggedIn.service.js";
import e from "express";

export const handleUpload = async (req, res) => {
    try {
        let { title, description, visibility, genre } = req.body;
        if (!description || !title || !visibility || !genre) {
            throw new Error("desscription or title or genre or visibility is not coming from req.body");
        }
        // console.log(genre);
        genre = JSON.parse(genre);
        if (visibility !== "public" && visibility !== "private") {
            throw new Error("visibility must be public or private");
        }
        const { storedFileName, uniqueFolderPath, files } = req;
        const file = files?.video?.[0];
        if (!storedFileName || !uniqueFolderPath || !file) {
            throw new Error("storedFileName or uniqueFolderPath or file is not coming from req");
        }
        const newVideo = await handleUploadService(storedFileName, uniqueFolderPath, file, title, description, req.user._id, visibility, genre, req.files.thumbnail?.[0]);


        return res.status(201).json({
            success: true,
            message: "Video uploaded and processed successfully.",
            m3u8Url: newVideo.m3u8Path,
            videoId: newVideo._id,
        });

    } catch (err) {
        console.error("Upload Handler Error:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const addComment = async (req, res) => {
    const { videoId } = req.params;
    if (!videoId) {
        return res.status(400).json({
            error: "videoId is not coming",
        });
    }
    const { comment } = req.body;
    if (comment.length === 0) {
        return res.status(400).json({
            success: false,
            error: "comment cannot be nothing",
        });
    }
    const newComment = await addCommentService(req.user._id, videoId, comment);
    // console.log(newComment);
    return res.status(201).json({
        success: true,
        message: "Comment added successfully",
        comment: newComment,
    });
}

export const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    if (!commentId) {
        return res.status(400).json({
            success: false,
            error: "commentId is not coming",
        });
    }
    const response = await deleteCommentService(req.user._id, commentId);
    if (!response.success) {
        res.status(400).json({
            success: false,
            error: response.message,
        });
    } else {
        res.status(200).json({
            success: true,
            message: response.message,
        });
    }
}

export const toggleLike = async (req, res) => {
    const { videoId } = req.params;
    if (!videoId) {
        return res.status(400).json({
            error: "videoId is not coming",
        });
    }
    const response = await toggleLikeService(req.user._id, videoId);
    return res.status(200).json({
        success: true,
        liked: response.liked,
        message: response.message,
    });
}

export const getMyVideos = async (req, res) => {
    // console.log("fsdkjlfhkjfhsdfdslkjf");
    const userId = req.user._id;
    if (!userId) return res.status(404).json({
        success: false,
        error: "Cannot find user id"
    });
    let response = await getMyVideosService(userId);
    if (!response.success) {
        return res.status(response.status).json({
            success: false,
            error: response.message
        })
    }
    return res.status(200).json({
        success: true,
        videos: response.videos
    })
}

export const getMyDetails = async (req, res) => {
    try {
        const userId = req.user._id;
        const response = await getMyDetailsService(userId);
        if (!response.success) {
            return res.status(response.status).json({
                success: false,
                message: response.message,
            });
        }
        return res.status(200).json({
            success: true,
            userDetails: response.userDetails,
            message: "User details fetched successfully",
        });
    } catch (err) {
        console.error("Get My Details Error: ", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const getLikedDetails = async (req, res) => {
    try {
        const userId = req.user._id;
        const response = await getLikedDetailsService(userId);
        if (!response.success) {
            return res.status(response.status).json({
                success: false,
                message: response.message,
            });
        }
        return res.status(200).json({
            success: true,
            likedVideos: response.likedVideos,
            message: "Liked videos fetched successfully",
        });
    } catch (err) {
        console.error("Get Liked Videos Error: ", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}