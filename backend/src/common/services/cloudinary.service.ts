import { Injectable } from '@nestjs/common';
import { cloudinaryUpload } from '../libs/cloudinary';
import * as cloudinary from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  async upload(imageURI: string) {
    return await cloudinaryUpload(imageURI);
  }

  async uploadStream(imageBuffer: Buffer) {
    return new Promise<cloudinary.UploadApiResponse>((resolve, reject) => {
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
