import { Module } from '@nestjs/common'
import { UPLOAD_FILE_SERVICE } from './services/upload.interface'
import { FireBaseUpload } from './services/firebase/firebase-upload.service'
import { FirebaseFactory } from './services/firebase/firebase-factory.service'
import { FirebaseStorage } from './services/firebase/firebase-storage.service'

@Module({
  providers: [
    {
      useClass: FireBaseUpload,
      provide: UPLOAD_FILE_SERVICE,
    },
    FirebaseFactory,
    FirebaseStorage,
  ],
  exports: [UPLOAD_FILE_SERVICE, FirebaseFactory, FirebaseStorage],
})
export class UploadModule {}
