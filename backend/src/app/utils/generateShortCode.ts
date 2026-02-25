import urlModel from "../modules/url/url.model";


export const generateUniqueShortCode = async (
  length = Math.floor(Math.random() * 3) + 6
): Promise<string> => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let shortCode = "";
  let exists = true;

  while (exists) {
    shortCode = "";
    for (let i = 0; i < length; i++) {
      shortCode += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const found = await urlModel.findOne({ shortCode });
    exists = !!found;
  }

  return shortCode;
};
