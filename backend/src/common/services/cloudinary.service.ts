import { Injectable } from '@nestjs/common';
import { cloudinaryUpload } from '../libs/cloudinary';
import cloudinary from 'cloudinary';
import streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  async upload(imageURI: string) {
    return await cloudinaryUpload(imageURI);
  }

  async uploadStream(imageBuffer: Buffer) {
    return new Promise((resolve, reject) => {
      const imageStream = cloudinary.v2.uploader.upload_stream(
        {
          upload_preset: 'lakoe',
        },
        (err, result) => {
          if (err) return reject(err);
          return resolve(result);
        },
      );

      streamifier.createReadStream(imageBuffer).pipe(imageStream);
    });
  }
}
