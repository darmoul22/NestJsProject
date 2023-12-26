import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { initializeApp, getApps, FirebaseOptions, FirebaseApp } from 'firebase/app'
import FileUtil from 'src/upload/util/file.util'
import { DEFAULT_BUCKET, FIREBASE_CREDENTIALS_PATH } from './firebase.constant'
import { getStorage } from '@firebase/storage'

@Injectable()
export class FirebaseFactory {
  private readonly firebaseApp: FirebaseApp

  constructor() {
    if (getApps().length === 0) {
      const firebaseOptions = this.getFirebaseOptions()
      this.firebaseApp = initializeApp(firebaseOptions)
    }
  }

  getFirebaseApp(): FirebaseApp {
    return this.firebaseApp
  }

  getFirebaseStorage() {
    return getStorage(this.firebaseApp, DEFAULT_BUCKET)
  }

  private getFirebaseOptions() {
    const firebaseCredentials = FileUtil.readJSONFile<FirebaseOptions>(FIREBASE_CREDENTIALS_PATH)
    if (!firebaseCredentials) {
      throw new InternalServerErrorException('Firebase was not properly set')
    }
    return firebaseCredentials
  }
}
