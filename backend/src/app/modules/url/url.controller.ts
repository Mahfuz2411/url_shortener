import { Response } from "express";
import { createShortUrlService } from "./url.service";
import { AuthenticatedRequest } from "../../middlewares/authenticatedRequest";

export const createUrlController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const email = req.user?.email!;
    const { originalUrl } = req.body;

    const url = await createShortUrlService({
      originalUrl,
      email,
    });

    res.status(201).json({
      success: true,
      shortUrl: `${process.env.BASE_URL}/redirect/${url.shortCode}`,
      data: url,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create short url",
    });
  }
};
