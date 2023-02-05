import {Process, Processor} from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { EventService } from '../events/event.service';



@Processor('Queue')
export class QueueConsumer{
    logger = new Logger(QueueConsumer.name);

    constructor(private readonly event:EventService){}
}

