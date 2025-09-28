import {
    addCommentService,
    deleteCommentService,
    getVideoService,
    toggleLikeService,
    getVideosService,
    sendMasterManifestService,
    sendManifestService,
    sendSegmentService,
    getMyVideosService,
} from "../services/stream.service.js";

export const sendVideo = async (req, res) => {
    const { videoId } = req.params;
    if (!videoId) {
        return res.status(400).json({
            error: "videoId is not coming",
        });
    }
    const token = req.cookies.token;
    const response = await getVideoService(token, videoId);
    if (!response.success) {
        return res.status(400).json({
            success: false,
            error: response.message,
        });
    }
    return res.status(200).json({
        success: true,
        message: response.message,
        video: response.video,
    });
}

export const addComment = async (req, res) => {
    try {
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
                error: "comment cannot be empty",
            });
        }
        let ret = await addCommentService(req.user._id, videoId, comment);
        if (ret) {
            return res.status(200).json({
                success: true,
                message: "Added new comment",
                id:ret._id
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            error:"server error"
        })
    }
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
        message: response.message,
    });
}

export const sendVideos = async (req, res) => {
    const { pageNo } = req.params;
    if (pageNo < 0 || pageNo === undefined) {
        return res.status(400).json({
            success: false,
            error: "pageNo cannot be negative"
        });
    }
    const response = await getVideosService(pageNo);
    // console.log("response :", response.videos)
    if (!response.success) {
        return res.status(500).json({
            success: false,
            error: "internal server error on sendVideos in stream.controller.js"
        });
    }
    return res.status(200).json({
        success: true,
        message: "videos fetched successfully",
        videos: response.videos,
        hasNext: response.hasNext,
    });
}

export const sendMasterManifest = async (req, res) => {
    try {
        const { videoId } = req.params;
        if (!videoId) {
            return res.status(400).json({
                success: false,
                error: "videoId cannot be undefined"
            });
        }

        // Pass the user's auth token (if it exists) to the service for validation
        const response = await sendMasterManifestService(videoId, req.cookies.token);

        if (!response.success) {
            return res.status(response.status).json({
                success: false,
                error: response.message,
            });
        }

        // Set the content type required by HLS players
        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        // Send the modified manifest string as the response
        return res.send(response.manifestContent);

    } catch (error) {
        console.log("Server Error in sendMasterManifest: " + error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
}

export const sendManifest = async (req, res) => {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(400).json({
                success: false,
                error: "token not found",
            });
        }
        const response = await sendManifestService(token);
        if (!response.success) {
            return res.status(response.status).json({
                success: false,
                error: response.message,
            });
        }

        // Set the content type required by HLS players
        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        // Send the modified manifest string as the response
        return res.send(response.manifestContent);

    } catch (error) {
        console.log("Server Error in sendManifest: " + error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
}

export const sendSegment = async (req, res) => {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(400).json({
                success: false,
                error: "token not found",
            });
        }
        const response = await sendSegmentService(token);
        if (!response.success) {
            return res.status(response.status).json({
                success: false,
                error: response.message,
            });
        }
        res.sendFile(response.path) //i dont know whether this is correct or not
    } catch (error) {
        console.log("Server Error in sendSegment: " + error);
        return res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
}

export const getMyVideos =async (req,res) => {
    const userId=req.user._id;
    if(userId) return res.status(404).json({
        success:false,
        error:"Cannot find user id"
    });
    let response=await getMyVideosService(userId);
    if(!response.success) {
        return res.status(response.status).json({
            success:false,
            error:response.message
        })
    }
    return res.status(200).json({
        success:true,
        videos:response.videos
    })
}