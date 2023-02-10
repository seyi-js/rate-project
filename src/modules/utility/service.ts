import { Injectable } from '@nestjs/common';
import sharp from 'sharp';
import APIQueryFeatures from './APIQueryFeatures';

@Injectable()
export class UtilityService {
  async resizeImage(
    imageBuffer: Buffer,
    width: number,
    height: number,
  ): Promise<Buffer> {
    return await sharp(imageBuffer)
      .resize(width, height)
      .toFormat('png')
      .png({ quality: 100 })
      .toBuffer();
  }

  async APIQuery(query: any, queryString: any) {
    return await new APIQueryFeatures(query, queryString)
      .filter()
      .sort()
      .limitFields()
      .paginate().query;
  }
}
