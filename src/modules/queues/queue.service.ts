import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('Queue') private readonly queue: Queue) {}

  async retryJob(jobId: string) {
    const job = await this.queue.getJob(jobId);

    if (job) {
      await job.moveToFailed(new Error('Retry job'), true);
      return await job.promote();
    }
  }
}
