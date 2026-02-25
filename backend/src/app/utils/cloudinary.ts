import { v2 as cloudinary } from 'cloudinary';
import config from '../config';


cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});


export const uploadToCloudinary = (file: Express.Multer.File): Promise<string> => {

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'users' },
      (error, result) => {
        if (error || !result) return reject(error || new Error('Upload failed'));
        resolve(result.secure_url);
      }
    );

    stream.end(file.buffer);
  });
};

export default cloudinary;
