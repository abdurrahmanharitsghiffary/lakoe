import cloudinary from 'cloudinary';

export const cloudinaryUpload = (file: string) =>
  cloudinary.v2.uploader.upload(file, { upload_preset: 'lakoe' });
