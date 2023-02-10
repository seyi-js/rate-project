import { Injectable } from '@nestjs/common';
import sharp from 'sharp';

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
}
