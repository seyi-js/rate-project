import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EventEnum } from '../events/types';
import { IEmailNotification } from './interface';
import { ModuleAbstractService } from '../modules.abstract.class';
import { EmailService } from './email/service';

@Injectable()
export class NotificationService extends ModuleAbstractService {

    constructor(private readonly email:EmailService) {
        super();
    }

  @OnEvent(EventEnum.EMAIL_NOTIFICATION)
  async handleEmailNotification(payload: IEmailNotification) {
    try {
        this.verbose({
          class: NotificationService,
          message: `Email notification event received with payload: ${JSON.stringify(
            payload,
          )}`,
        });
    } catch (error) {
        throw error;
    }
  }
}
