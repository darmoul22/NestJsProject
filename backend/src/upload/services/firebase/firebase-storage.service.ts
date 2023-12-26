import { Injectable } from '@nestjs/common'
import { FirebaseFactory } from './firebase-factory.service'
import { ref, uploadBytes } from '@firebase/storage'
import type { File } from 'src/upload/types'

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
