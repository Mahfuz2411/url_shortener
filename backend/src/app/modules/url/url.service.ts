import mongoose from "mongoose";
import { generateUniqueShortCode } from "../../utils/generateShortCode";
import urlModel from "./url.model";


interface CreateUrlPayload {
  originalUrl: string;
  email: string;
  userStatus: string;
  customCode?: string;
}

const createShortUrlService = async ({ originalUrl, email, userStatus, customCode }: CreateUrlPayload) => {
  const isPremium = userStatus === 'pro-user' || userStatus === 'admin';

  if (!isPremium) {
    const totalUrls = await urlModel.countDocuments({ email });
    if (totalUrls >= 100) {
      throw new Error("Free tier limit reached. Upgrade to Pro for unlimited URLs.");
    }
    if (customCode) {
      throw new Error("Custom codes are available for Pro users only.");
    }
  }

  const existingUrl = await urlModel.findOne({
    originalUrl,
    email,
    status: true,
  });

  if (existingUrl) {
    return existingUrl;
  }

  let shortCode: string;
  if (isPremium && customCode) {
    const taken = await urlModel.findOne({ shortCode: customCode });
    if (taken) throw new Error("This custom code is already taken. Please choose another.");
    shortCode = customCode;
  } else {
    shortCode = await generateUniqueShortCode();
  }

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
  };

  return result;
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

const userAnalyticsService = async (email: string) => {
  const allUrls = await urlModel.find({ email }).lean();

  const totalUrls = allUrls.length;
  const activeUrls = allUrls.filter(u => u.status).length;
  const inactiveUrls = totalUrls - activeUrls;
  const totalClicks = allUrls.reduce((s, u) => s + u.clicks, 0);
  const avgClicks = totalUrls > 0 ? parseFloat((totalClicks / totalUrls).toFixed(2)) : 0;
  const bestUrl = allUrls.reduce((best, u) => (!best || u.clicks > best.clicks ? u : best), null as typeof allUrls[0] | null);

  // URLs created per day — last 30 days
  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
  thirtyDaysAgo.setHours(0, 0, 0, 0);

  const createdPerDayMap: Record<string, number> = {};
  for (let i = 0; i < 30; i++) {
    const d = new Date(thirtyDaysAgo);
    d.setDate(d.getDate() + i);
    createdPerDayMap[d.toISOString().slice(0, 10)] = 0;
  }
  allUrls.forEach(u => {
    const day = new Date(u.createdAt).toISOString().slice(0, 10);
    if (createdPerDayMap[day] !== undefined) createdPerDayMap[day]++;
  });
  const createdPerDay = Object.entries(createdPerDayMap).map(([date, count]) => ({ date, count }));

  // Click distribution buckets
  const buckets = { '0': 0, '1-10': 0, '11-50': 0, '51-200': 0, '200+': 0 };
  allUrls.forEach(u => {
    if (u.clicks === 0) buckets['0']++;
    else if (u.clicks <= 10) buckets['1-10']++;
    else if (u.clicks <= 50) buckets['11-50']++;
    else if (u.clicks <= 200) buckets['51-200']++;
    else buckets['200+']++;
  });
  const clickDistribution = Object.entries(buckets).map(([range, count]) => ({ range, count }));

  // Top 10 URLs by clicks
  const topUrls = [...allUrls]
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, 10)
    .map(u => ({
      shortCode: u.shortCode,
      originalUrl: u.originalUrl,
      clicks: u.clicks,
      createdAt: u.createdAt,
    }));

  // Domain breakdown (top 8 domains)
  const domainMap: Record<string, number> = {};
  allUrls.forEach(u => {
    try {
      const domain = new URL(u.originalUrl).hostname.replace(/^www\./, '');
      domainMap[domain] = (domainMap[domain] || 0) + 1;
    } catch { /* skip invalid URLs */ }
  });
  const topDomains = Object.entries(domainMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([domain, count]) => ({ domain, count }));

  // Click performance percentiles
  const sorted = [...allUrls].sort((a, b) => a.clicks - b.clicks);
  const p50 = sorted[Math.floor(sorted.length * 0.5)]?.clicks ?? 0;
  const p90 = sorted[Math.floor(sorted.length * 0.9)]?.clicks ?? 0;

  return {
    summary: { totalUrls, activeUrls, inactiveUrls, totalClicks, avgClicks, p50Clicks: p50, p90Clicks: p90 },
    bestUrl: bestUrl ? { shortCode: bestUrl.shortCode, originalUrl: bestUrl.originalUrl, clicks: bestUrl.clicks } : null,
    createdPerDay,
    clickDistribution,
    topUrls,
    topDomains,
  };
};





const urlServices = {
  createShortUrlService,
  getUrlsByEmailService,
  deleteUrlService,
  deleteUrlServiceSoft,
  userDashboardStatService,
  userAnalyticsService,
}

export default urlServices;