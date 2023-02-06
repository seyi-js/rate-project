import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Mailer from 'nodemailer';
import * as HandleBar from 'nodemailer-express-handlebars';
import { IEmailConfig } from '../../../config/config.interface';
import { ISendEmail } from './interface';

@Injectable()
export class EmailService {
  constructor(private readonly config: ConfigService) {}

  private emailConfig = this.config.get<IEmailConfig>('email');

  private transporter = Mailer.createTransport(
    {
      ...this.emailConfig,
    },
    { from: `"Fave" <${this.emailConfig.from}>` },
  );


  async sendEmail(payload:ISendEmail){
    const options = {
      to: payload.to,
      subject: payload.subject,
      context: {
        ...payload.context,
        to: payload.to,
        year: new Date().getFullYear(),
      },
      template: payload.template,
    };

    this.transporter.use(
      'compile',
      HandleBar({
        viewEngine: {
          extname: '.hbs',
          layoutsDir:
            process.cwd() + '/src/modules/notification/email/templates/',
          defaultLayout: payload.template,
        },
        viewPath: process.cwd() + '/src/modules/notification/email/templates/',
        extName: '.hbs',
      }),
    );

    const response = await this.transporter.sendMail(options);

    return response;
  }


}
