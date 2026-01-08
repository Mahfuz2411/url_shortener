import { generateUniqueShortCode } from "../../utils/generateShortCode";
import urlModel from "./url.model";


interface CreateUrlPayload {
  originalUrl: string;
  email: string;
}

const createShortUrlService = async ({
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

// With pagination
// const getUrlsByEmailService = async (
//   email: string,
//   page = 1,
//   limit = 10
// ) => {
//   const skip = (page - 1) * limit;  

//   const urls = await urlModel.find(
//     { email, status: true },
//     { originalUrl: 1, shortCode: 1, clicks: 1, createdAt: 1 }
//   )
//     .skip(skip)
//     .limit(limit)
//     .sort({ createdAt: -1 });

//   const total = await urlModel.countDocuments({ email, status: true });

//   return {
//     total,
//     page,
//     limit,
//     urls,
//   };
// };

const getUrlsByEmailService = async (email: string) => {
  const urls = await urlModel.find(
    {
      email,
      status: true,
    },
    {
      originalUrl: 1,
      shortCode: 1,
      clicks: 1,
      createdAt: 1,
      status: 1
    }
  ).sort({ createdAt: -1 });

  return urls;
};





const urlServices = {
  createShortUrlService,
  getUrlsByEmailService
}

export default urlServices;