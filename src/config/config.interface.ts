import { MongooseModuleOptions } from '@nestjs/mongoose';

export interface IAppConfig {
  port: number;
  environment: Environment;
  appName: string;
}

export type Environment = 'development' | 'production' | 'test' | 'staging';

export type IDataBaseConfig = MongooseModuleOptions;

export type IEmailConfig = {
  service: string;
  auth: {
    user: string;
    pass: string;
  };
  host: string;
  port: number;
  from: string;
}

export type IAwsConfig = {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
}