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
      { 
        folder: 'users',
        resource_type: 'image',
        transformation: [
          { width: 500, height: 500, crop: 'limit' },
          { quality: 'auto:good' }
        ]
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        if (!result) {
          return reject(new Error('Upload failed: No result returned'));
        }
        resolve(result.secure_url);
      }
    );

    stream.end(file.buffer);
  });
};

export default cloudinary;
