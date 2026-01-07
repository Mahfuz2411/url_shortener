import urlModel from "../url/url.model";


const getAndIncreaseClick = async (shortCode: string) => {
    const url = await urlModel.findOneAndUpdate(
        { shortCode, status: true },
        { $inc: { clicks: 1 } },
        { new: true }
    );

    return url;
};

const redirectServices = {
    getAndIncreaseClick,
}

export default redirectServices;