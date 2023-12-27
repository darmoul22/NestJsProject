import { Module } from '@nestjs/common';
import {FirebaseStorage} from "./services/firebase-storage.service";
import {FirebaseFactory} from "./services/firebase-factory.service";
import {FirebaseUpload} from "./services/firebase-upload.service";

@Module({
    providers: [
        FirebaseUpload,
        FirebaseFactory,
        FirebaseStorage,
    ],
    exports: [FirebaseUpload, FirebaseFactory, FirebaseStorage],
})
export class FileUploadModule {}
