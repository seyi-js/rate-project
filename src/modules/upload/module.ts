import { Global, Module } from "@nestjs/common";
import { AwsS3Service } from "./awsS3/service";
import { UploadService } from "./service";


@Global()
@Module({
    imports: [],
    providers: [AwsS3Service,UploadService],
    exports: [AwsS3Service,UploadService]
})

export class UploadModule {}