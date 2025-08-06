import { imagekit } from "../config/uploadImgConfig";

export const uploadImgs = async (fileBase64 : string, fileName : string) => {
    const response = await imagekit.upload({
        file : fileBase64,
        fileName : fileName
    });
    return response;
};
