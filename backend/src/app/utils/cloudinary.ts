import { v2 as cloudinary } from 'cloudinary';
import config from '../config';


cloudinary.config({
  cloud_name: config.cloud_name,
  api_key: config.api_key,
  api_secret: config.api_secret,
});


export const uploadToCloudinary = (file: Express.Multer.File): Promise<string> => {

  return new Promise((resolve, reject) => {
    console.log('Starting Cloudinary upload...');
    console.log('File size:', file.size, 'bytes');
    console.log('File mimetype:', file.mimetype);
    
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
          console.error('Cloudinary upload error:', error);
          return reject(error);
        }
        if (!result) {
          console.error('Cloudinary upload failed: No result returned');
          return reject(new Error('Upload failed: No result returned'));
        }
        console.log('Cloudinary upload successful:', result.secure_url);
        resolve(result.secure_url);
      }
    );

    stream.end(file.buffer);
  });
};

export default cloudinary;
