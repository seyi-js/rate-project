import { Injectable } from "@nestjs/common";
import { InjectQueue } from '@nestjs/bull';
import { Queue, JobOptions } from 'bull';


@Injectable()
export class QueueProducer {
  private jobOptions = {
    removeOnComplete: {
      age: 604800, // 7 days
    },
    priority: 1,
    attempts: 200,
    lifo: true,
  };

  constructor (@InjectQueue('Queue') private readonly queue :Queue) {}
}