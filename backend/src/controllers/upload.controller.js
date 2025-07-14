import { handleUploadService } from "../services/upload.service";

export const handleUpload = async (req, res) => {
    try {
        const { title,description } = req.body;
        if (!description || !title) {
            throw new Error("desscription or title is not coming from req.body");
        }
        const { storedFileName, uniqueFolderPath, file } = req;
        if (!storedFileName || !uniqueFolderPath || !file) {
            throw new Error("storedFileName or uniqueFolderPath or file is not coming from req");
        }
        const newVideo = await handleUploadService(storedFileName,uniqueFolderPath,file,title,description,req.session.user._id);
        

        return res.status(201).json({
            success: true,
            message: "Video uploaded and processed successfully.",
            m3u8Url: `${uniqueFolderPath}/output.m3u8`,
            videoId: newVideo._id,
        });

    } catch (err) {
        console.error("Upload Handler Error:", err);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};