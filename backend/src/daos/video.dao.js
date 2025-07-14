import Video from "../models/Video";

export const addVideoDao = async (file, title, description, outputM3U8, uniqueFolderPath, userId) => {
    const newVideo = new Video({
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        title: title,
        description: description,
        uploadTime: new Date(),
        m3u8Path: outputM3U8,
        folderPath: uniqueFolderPath,
        uploadedBy: userId,
    });

    return await newVideo.save();
}