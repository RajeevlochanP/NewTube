import path from "path";
import { addVideoDao } from "../daos/video.dao";

export const handleUploadService = async (storedFileName, uniqueFolderPath, file, title,description,userId) => {
    const inputPath = path.join(uniqueFolderPath, storedFileName);
    const outputM3U8 = await segmentToHLS(inputPath, uniqueFolderPath);
    return await addVideoDao(file,title,description,outputM3U8,uniqueFolderPath,userId);
}