import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";




@Injectable()
export class EventService {
    constructor(private readonly event:EventEmitter2){}
}