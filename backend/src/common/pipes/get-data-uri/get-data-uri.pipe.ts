import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { getDataURIFromBuffer } from 'src/common/utils/get-data-uri';

@Injectable()
export class GetImageDataURI implements PipeTransform {
  async transform(value: Express.Multer.File[], metadata: ArgumentMetadata) {
    return await Promise.all(value.map((file) => getDataURIFromBuffer(file)));
  }
}
