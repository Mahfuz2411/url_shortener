import { Response } from "express";
import urlServices from "./url.service";
import { AuthenticatedRequest } from "../../middlewares/authenticatedRequest";
import catchAsync from "../../utils/catchAsync";

const createUrlController = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const email = req.user?.email!;
    const userStatus = req.user?.status || 'user';
    const { originalUrl, customCode } = req.body;


    const url = await urlServices.createShortUrlService({
      originalUrl,
      email,
      userStatus,
      customCode,
    });

    res.status(201).json({
      success: true,
      shortUrl: `${process.env.BASE_URL}/r/${url.shortCode}`,
      data: url,
    });
  });

const getMyUrlList = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const email = req.user?.email!;   


    const urlList = await urlServices.getUrlsByEmailService(email);

    res.status(200).json({
      success: true,
      message: "URL list fetched successfully",
      data: urlList,
    });
  }
);

const deleteMyUrl = catchAsync(
  async (req: AuthenticatedRequest, res: Response) => {
    const email = req.user?.email!;
    const { urlId } = req.body;

    const result = await urlServices.deleteUrlServiceSoft(urlId, email);

    res.status(200).json({
      success: true,
      message: "URL deleted permanently",
      data: result,
    });
  }
);

const getUserDashboardStats = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
  const email = req.user?.email!;
  // console.log(email);
  

  const result = await urlServices.userDashboardStatService(email);

  res.status(200).json({
    success: true,
    data: result,
  });
});




const getUserAnalytics = catchAsync(async (req: AuthenticatedRequest, res: Response) => {
  const email = req.user?.email!;
  const result = await urlServices.userAnalyticsService(email);
  res.status(200).json({ success: true, data: result });
});




const urlControllers = {
  createUrlController,
  getMyUrlList,
  deleteMyUrl,
  getUserDashboardStats,
  getUserAnalytics,
};

export default urlControllers;