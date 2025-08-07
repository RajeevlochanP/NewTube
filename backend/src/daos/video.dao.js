import Video from "../models/Video.js";

export const addVideoDao = async (file, title, description, masterM3U8, uniqueFolderPath, userId,visibility,genre) => {
    const newVideo = new Video({
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        title: title,
        description: description,
        uploadTime: new Date(),
        m3u8Path: masterM3U8,
        folderPath: uniqueFolderPath,
        uploadedBy: userId,
        likesCount: 0,
        visibility:visibility,
        genre:genre,
    });

    return await newVideo.save();
}

export const getVideoById = async (videoId) => {
    return await Video.findById(videoId).lean();
}

export const getVideos = async (pageNo) => {
    const limit = 20;
    const videos = await Video.find()
        .sort({ uploadTime: -1 })
        .skip(pageNo*limit)
        .limit(limit + 1)
        .lean();
    return videos;
}