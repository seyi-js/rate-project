import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as AWS from "aws-sdk";
import { IAwsConfig } from "../../../config/config.interface";



export type s3UploadPayload={
    file:Buffer,
    mimetype:string,
    fileName:string,
    folderName:string
    bucketName:string
}


@Injectable()
export class AwsS3Service {
    private aws:AWS.S3;

    constructor(private readonly config: ConfigService ) {
        this.aws = new AWS.S3({
            accessKeyId: this.config.get<IAwsConfig>('aws').accessKeyId,
            secretAccessKey: this.config.get<IAwsConfig>('aws').secretAccessKey,
            region: this.config.get<IAwsConfig>('aws').region,
        })
    }


    async uploadFile(payload:s3UploadPayload): Promise<string> {

        const { file, folderName, bucketName,fileName,mimetype } = payload;

        const params:AWS.S3.PutObjectRequest = {
          Bucket: bucketName,
          Key: `${folderName}/${fileName}`,
          Body: file,
          ContentType: mimetype,
          
        };

        const response = await this.aws.upload(params).promise();
        return response.Location;
    }
}