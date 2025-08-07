import { handleUploadService } from "../services/upload.service.js";

export const handleUpload = async (req, res) => {
    try {
        const { title,description,visibility,genre } = req.body;
        if (!description || !title || !visibility || !genre) {
            throw new Error("desscription or title or genre is not coming from req.body");
        }
        if(visibility!=="public" && visibility!=="private"){
            throw new Error("visibility must be public or private");
        }
        const { storedFileName, uniqueFolderPath, file } = req;
        if (!storedFileName || !uniqueFolderPath || !file) {
            throw new Error("storedFileName or uniqueFolderPath or file is not coming from req");
        }
        const newVideo = await handleUploadService(storedFileName,uniqueFolderPath,file,title,description,req.user._id,visibility,genre);
        

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