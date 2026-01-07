import { Response } from "express";
import urlServices from "./url.service";
import { AuthenticatedRequest } from "../../middlewares/authenticatedRequest";
import catchAsync from "../../utils/catchAsync";

const createUrlController = catchAsync(async (
    req: AuthenticatedRequest,
    res: Response
) => {
    const email = req.user?.email!;
    const { originalUrl } = req.body;


    const url = await urlServices.createShortUrlService({
        originalUrl,
        email,
    });

    res.status(201).json({
        success: true,
        shortUrl: `${process.env.BASE_URL}/redirect/${url.shortCode}`,
        data: url,
    });
});

const urlControllers = {
    createUrlController,
};

export default urlControllers;