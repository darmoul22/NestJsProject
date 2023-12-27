import { Module } from '@nestjs/common';
import {FirebaseStorage} from "./services/firebase-storage.service";
import {FirebaseFactory} from "./services/firebase-factory.service";
import {FirebaseUpload} from "./services/firebase-upload.service";
import {FileUploadController} from "./controller/file-upload.controller";

@Module({
    controllers:[FileUploadController],
    providers: [
        FirebaseUpload,
        FirebaseFactory,
        FirebaseStorage,
    ],
    exports: [FirebaseUpload, FirebaseFactory, FirebaseStorage],
})
export class FileUploadModule {}
