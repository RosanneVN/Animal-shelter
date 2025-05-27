import { imagekit } from "../config/uploadImgConfig";

export const deleteImg = async (fileId: string) => {
  const response = await imagekit.deleteFile(fileId);
  console.log(response);
};