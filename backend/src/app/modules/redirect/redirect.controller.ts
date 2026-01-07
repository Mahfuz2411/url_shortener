import catchAsync from "../../utils/catchAsync";
import { Request, Response } from "express";
import redirectServices from "./redirect.service";

const redirectUrl = catchAsync(async (req: Request, res: Response) => {
    const { shortCode } = req.params;

    const url = await redirectServices.getAndIncreaseClick(shortCode);

    if (!url) {
        return res.status(404).json({
            message: "URL not found or inactive",
        });
    }

    // redirect
    return res.redirect(url.originalUrl);
});

const redirectControllers = {
    redirectUrl,
};

export default redirectControllers;