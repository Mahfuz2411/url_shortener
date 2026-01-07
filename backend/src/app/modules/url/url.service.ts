import { generateUniqueShortCode } from "../../utils/generateShortCode";
import urlModel from "./url.model";


interface CreateUrlPayload {
  originalUrl: string;
  email: string;
}

export const createShortUrlService = async ({
  originalUrl,
  email,
}: CreateUrlPayload) => {

  const existingUrl = await urlModel.findOne({
    originalUrl,
    email,
    status: true,
  });

  if (existingUrl) {
    return existingUrl;
  }

  const shortCode = await generateUniqueShortCode();
  const url = await urlModel.create({
    originalUrl,
    shortCode,
    email,
    clicks: 0,
    status: true,
  });
  
  const result = {
    _id: url._id,
    originalUrl: url.originalUrl,
    shortCode: url.shortCode,
  }
  return url;
};
