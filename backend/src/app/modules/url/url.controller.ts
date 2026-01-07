import { Response } from "express";
import { createShortUrlService } from "./url.service";
import { AuthenticatedRequest } from "../../middlewares/authenticatedRequest";
import catchAsync from "../../utils/catchAsync";

export const createUrlController = catchAsync(async (
    req: AuthenticatedRequest,
    res: Response
) => {
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
});
