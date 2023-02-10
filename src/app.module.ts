import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import * as Sentry from '@sentry/node';
import '@sentry/tracing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import appConfig from './config/app.config';
import { IAppConfig } from './config/config.interface';
import dbConfig from './config/db.config';
import { AllExceptionsFilter } from './interceptors/exception.interceptor';
import { ThrottlerBehindProxyGuard } from './middleware/throttler-proxy-guard';
import { SentryModule } from './modules/sentry/sentry.module';
import { EventModule } from './modules/events/events.module';
import { BullModule } from '@nestjs/bull';
import { QueueModule } from './modules/queues/queues.module';
import { NotificationModule } from './modules/notification/module';
import emailConfig from './config/email.config';
import awsConfig from './config/aws.config';
import { UploadModule } from './modules/upload/module';
import { UtilityModule } from './modules/utility/module';
import { CacheModule as CustomCacheModule } from './modules/cache/module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig,emailConfig,awsConfig],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        ...(await dbConfig()).db,
        appName: config.get<IAppConfig>('app').appName,
      }),
    }),

    CacheModule.register({
      isGlobal: true,
    }),

    ThrottlerModule.forRoot({
      ttl: 1,
      limit: 30,
    }),

    EventEmitterModule.forRoot({
      newListener: true,
      removeListener: true,
      verboseMemoryLeak: true,
    }),

    SentryModule.forRoot({
      dsn: process.env.SENTRY_DNS,
      environment: process.env.APP_ENV,
      tracesSampleRate: 1.0,
      debug: true,
      attachStacktrace: true,
      serverName: process.env.APP_NAME,
      integrations: [new Sentry.Integrations.Http({ tracing: true })],
    }),

    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
      },
      settings: {
        stalledInterval: 10000,
      },
    }),

    EventModule,
    QueueModule,
    NotificationModule,
    UploadModule,
    UtilityModule,
    CustomCacheModule,
    
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: ThrottlerBehindProxyGuard },
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Sentry.Handlers.requestHandler()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
