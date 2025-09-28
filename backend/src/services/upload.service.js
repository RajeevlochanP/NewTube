import path from "path";
import { addVideoDao } from "../daos/video.dao.js";
import { segmentToHLS } from "../utils/ffmpeg.js"

export const handleUploadService = async (storedFileName, uniqueFolderPath, file, title,description,userId,visibility,genre,thumbnailFile) => {
    const inputPath = path.join(uniqueFolderPath, storedFileName);
    const masterM3U8 = await segmentToHLS(inputPath, uniqueFolderPath);
    console.log(thumbnailFile.path);
    return await addVideoDao(file,title,description,masterM3U8,uniqueFolderPath,userId,visibility,genre,thumbnailFile.path);
}