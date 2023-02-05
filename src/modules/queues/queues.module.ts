import { BullModule } from '@nestjs/bull';
import { Module, Global } from '@nestjs/common';
import { QueueConsumer } from './consumer';
import { QueueProducer } from './producer';
import { QueueService } from './queue.service';

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'Queue',
      
    }),
  ],
  providers: [QueueProducer, QueueConsumer, QueueService],
  exports: [QueueConsumer, QueueProducer, QueueService],
})
export class QueueModule {}
