import { Injectable } from "@nestjs/common";
import { AwsS3Service } from "./awsS3/service";
import { uploadFilePayload } from "./interface";


@Injectable()
export class UploadService {
    constructor(private readonly aws:AwsS3Service) {
    }

    async uploadFile(payload:uploadFilePayload): Promise<string> {
        return await this.aws.uploadFile(payload);
    }
}