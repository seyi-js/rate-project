import { Global, Module } from '@nestjs/common';
import { EmailModule } from './email/module';
import { NotificationService } from './service';

@Global()
@Module({
  imports: [EmailModule],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
