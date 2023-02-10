import { Module } from '@nestjs/common/decorators';
import { MongooseModule } from '@nestjs/mongoose';
import { RateSchema } from './schema';
import { RateService } from './service';
import { HttpModule } from '@nestjs/axios/dist';
import { RateController } from './controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Rate', schema: RateSchema }]),
    HttpModule,
  ],
  controllers: [RateController],
  providers: [RateService],
  exports: [RateService],
})
export class RateModule {}
