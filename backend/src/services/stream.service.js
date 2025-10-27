import { getVideoById, getVideos } from "../daos/video.dao.js"
import { getCommentsByVideoId } from "../daos/comments.dao.js";
import { isLiked } from "../daos/likes.dao.js";
import jwt from "jsonwebtoken";
import fs from 'fs/promises';
import path from 'path';

export const getVideoService = async (token, videoId) => {
    const video = await getVideoById(videoId);
    if (!video) {
        return {
            success: false,
            message: "no video with the given videoId",
        }
    }
    video.comments = await getCommentsByVideoId(videoId); //comments is an array
    if (token === undefined) {
        console.log("token not there while sending video");
        video.isLiked = false;
    } else {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        video.isLiked = await isLiked(decoded._id, videoId);
    }
    return {
        success: true,
        message: "video details fetched successfully",
        video: video,
    }
}


export const getVideosService = async (pageNo) => {
    const limit = 20;
    console.log("page number: ", pageNo)
    const videos = await getVideos(pageNo);
    return {
        success: true,
        videos: videos,
        hasNext: (videos.length > limit),
    }
}

export const sendMasterManifestService = async (videoId, userAuthToken) => {
    const video = await getVideoById(videoId);
    if (!video) {
        return {
            success: false,
            status: 404,
            message: "Video not found",
        };
    }

    // --- Authorization Step ---
    if (video.visibility === 'private') {
        // Here you would verify the userAuthToken to ensure the user is logged in
        // and has permission to view the private video.
        // For example: const user = verifyUserToken(userAuthToken);
        // if (!user) return { success: false, status: 403, message: "Forbidden" };

        //for now lets say its not accessable
        return {
            success: false,
            message: "its private",
            status: 403,
        }
    }

    try {
        // --- File Reading Step ---
        // Construct the path to the original master manifest file
        const manifestPath = path.join(process.cwd(), video.m3u8Path);
        console.log("manifest path: " + manifestPath);
        const manifestContent = await fs.readFile(manifestPath, 'utf8');

        // --- URL Rewriting Step ---
        const lines = manifestContent.split('\n');
        const modifiedLines = lines.map(line => {
            // Only modify lines that are not comments/tags (i.e., they are URLs)
            if (line.trim() && !line.startsWith('#')) {
                // The resource path for this specific variant playlist
                const resourcePath = path.join(video.folderPath, line.trim());

                // Create a JWT for this specific resource
                const resourceToken = jwt.sign(
                    { resource: resourcePath },
                    process.env.JWT_SECRET,
                    { expiresIn: '24h' } // This playlist can be accessed for 24 hours
                );

                // Construct the new, absolute, signed URL
                // Note: The token is passed as a query parameter to your /manifest endpoint
                return `/stream/manifest?token=${resourceToken}`; //the leading / importance 💀
            }
            // Keep comments and tags as they are
            return line;
        });

        const modifiedManifest = modifiedLines.join('\n');

        return {
            success: true,
            manifestContent: modifiedManifest,
        };

    } catch (error) {
        console.error("Error processing manifest:", error);
        return { success: false, status: 500, message: "Could not process video manifest." };
    }
};

export const sendManifestService = async (token) => {
    try {
        console.log(process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const manifestPath = path.join(process.cwd(), decoded.resource);
        const manifestContent = await fs.readFile(manifestPath, 'utf8');
        const lines = manifestContent.split('\n');
        const modifiedLines = lines.map(line => {
            if (line.trim() && !line.startsWith('#')) {
                const resourcePath = path.join(path.dirname(decoded.resource), line.trim());
                const resourceToken = jwt.sign(
                    { resource: resourcePath },
                    process.env.JWT_SECRET,
                    { expiresIn: '5m' }
                );
                return `/stream/segment?token=${resourceToken}`; //the leading / importance 💀
            }
            return line;
        });

        const modifiedManifest = modifiedLines.join('\n');

        return {
            success: true,
            manifestContent: modifiedManifest,
        };
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return { success: false, status: 403, message: "Invalid or expired token." };
        }
        console.error("Error processing manifest:", error);
        return { success: false, status: 500, message: "Could not process video manifest." };
    }
}

export const sendSegmentService = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const relativePath = decoded.resource;
        const absolutePath = path.join(process.cwd(), relativePath);

        await fs.access(absolutePath);

        return {
            success: true,
            path: absolutePath // Send the absolute path back to the controller
        };

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return { success: false, status: 403, message: "Invalid or expired token." };
        }
        if (error.code === 'ENOENT') {
            return { success: false, status: 404, message: "Segment not found." };
        }
        console.error("Error in sendSegmentService:", error);
        return { success: false, status: 500, message: "Internal server error." };
    }
};

export const getMyVideosService = async (userId) => {
    try {
        const videos=await getMyVideos(userId);
        return {
            success:true,
            videos
        }
    } catch (error) {
        return {
            status:500,
            success:false,
            message:error.message
        }
    }
}