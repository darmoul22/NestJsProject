import {Injectable} from '@nestjs/common';
import {getStorage} from "@firebase/storage";
import { initializeApp, getApps, FirebaseApp, FirebaseOptions } from 'firebase/app'
import {ConfigService} from "@nestjs/config";
import {ConfigKey, StorageConfigType} from "../../common/config/env/app.config";
@Injectable()
export class FirebaseFactory {
    private readonly firebaseApp: FirebaseApp
    private readonly config: ConfigService

    constructor(config: ConfigService) {
        this.config = config
        if (getApps().length === 0) {
            this.firebaseApp = initializeApp(this.getFirebaseConfig())
        }
    }

    getFirebaseApp(): FirebaseApp {
        return this.firebaseApp
    }

    getFirebaseConfig(): FirebaseOptions {
       return  this.config.get<StorageConfigType>(ConfigKey.STORAGE) satisfies FirebaseOptions
    }

    getFirebaseStorage() {
        return getStorage(this.firebaseApp, this.getFirebaseConfig().storageBucket)
    }
}
