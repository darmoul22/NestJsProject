import {Injectable} from '@nestjs/common';
import {FirebaseStorage} from "./firebase-storage.service";
import type { File } from 'src/file-upload/types'

@Injectable()
export class FirebaseUpload {
    constructor(private readonly firebaseStorage: FirebaseStorage) {}

    async upload(file: File, path: string): Promise<string> {
        return await this.firebaseStorage.uploadFile(file, path)
    }
}
