import mongoose from "mongoose";
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
      createdAt: 1
    }
  ).sort({ createdAt: -1 });

  return urls;
};

const deleteUrlService = async (urlId: string, email: string) => {
  if (!mongoose.Types.ObjectId.isValid(urlId)) {
    throw new Error("Invalid URL id");
  }

  const deletedUrl = await urlModel.findOneAndDelete({
    _id: urlId,
    email, 
  });

  if (!deletedUrl) {
    throw new Error("URL not found or not authorized");
  }

  return {
    _id: deletedUrl._id,
    originalUrl: deletedUrl.originalUrl,
    shortCode: deletedUrl.shortCode,
  };
};

const deleteUrlServiceSoft = async (urlId: string, email: string) => {
  if (!mongoose.Types.ObjectId.isValid(urlId)) {
    throw new Error("Invalid URL id");
  }

  const updatedUrl = await urlModel.findOneAndUpdate(
    { _id: urlId, email, status: true },
    { status: false },
    { new: true }
  );

  if (!updatedUrl) {
    throw new Error("URL not found, already deleted, or not authorized");
  }

  return {
    _id: updatedUrl._id,
    originalUrl: updatedUrl.originalUrl,
    shortCode: updatedUrl.shortCode,
    status: updatedUrl.status,
  };
};

const userDashboardStatService = async (email: string) => {
    // Total URLs
  const totalUrls = await urlModel.countDocuments({ email });

  // Last created URLs (last 5)
  const lastUrls = await urlModel.find({ email })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  // Top clicked URLs (max 5)
  const topUrls = await urlModel.find({ email })
    .sort({ clicks: -1 })
    .limit(5)
    .lean();

  return {
    totalUrls,
    lastUrls,
    topUrls
  }
}





const urlServices = {
  createShortUrlService,
  getUrlsByEmailService,
  deleteUrlService,
  deleteUrlServiceSoft,
  userDashboardStatService,
}

export default urlServices;