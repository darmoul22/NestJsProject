import { Injectable } from '@nestjs/common';
import {ref, uploadBytes} from "@firebase/storage";
import type { File } from 'src/file-upload/types'
import {FirebaseFactory} from "./firebase-factory.service";
@Injectable()
export class FirebaseStorage {
    constructor(private readonly firebaseApp: FirebaseFactory) {}

    async uploadFile(file: File, path: string): Promise<string> {
        const filePath = `${path}/${file.name}.${file.extension}`
        const fileRef = ref(this.firebaseApp.getFirebaseStorage(), filePath)
        const uploadedFile = await uploadBytes(fileRef, file.content)
        return uploadedFile.metadata.fullPath
    }
}
