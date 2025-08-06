import ImageKit from "imagekit";

const { IMGKIT_PRIVATE_KEY, IMGKIT_PUBLIC_KEY, IMGKIT_URL } = import.meta.env;

const publicKey = IMGKIT_PUBLIC_KEY;
const privateKey = IMGKIT_PRIVATE_KEY;
const urlEndpoint = IMGKIT_URL;

export const imagekit = new ImageKit({
  publicKey: publicKey,
  privateKey: privateKey,
  urlEndpoint: urlEndpoint,
});
