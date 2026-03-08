import urlModel from "../url/url.model";
import userModel from "../user/user.model";

const getRedirectData = async (shortCode: string) => {
    const url = await urlModel.findOneAndUpdate(
        { shortCode, status: true },
        { $inc: { clicks: 1 } },
        { new: true }
    );

    if (!url) return null;

    const owner = await userModel.findOne({ email: url.email }, { status: 1 }).lean();
    const isPremium = owner?.status === 'pro-user' || owner?.status === 'admin';
    const waitSeconds = isPremium ? 0 : 7;

    return { originalUrl: url.originalUrl, waitSeconds };
};

const redirectServices = {
    getRedirectData,
};

export default redirectServices;