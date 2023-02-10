import { Global, Module } from '@nestjs/common';
import { UtilityService } from './service';

@Global()
@Module({
  providers: [UtilityService],
  exports: [UtilityService],
})
export class UtilityModule {}
