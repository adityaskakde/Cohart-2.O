import ImageKit from "imagekit";
import { config } from "../config/config.js";

const client = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
  publicKey: config.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: config.IMAGEKIT_URL_ENDPOINT
});

export async function uploadImage({ buffer, fileName, folder="snitch" }) {
  const result = await client.upload({
    file: buffer,
    fileName,
    folder
  });

  return result;
}