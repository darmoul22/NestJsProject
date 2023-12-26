import { Injectable } from '@nestjs/common'
import { IFileUpload } from '../upload.interface'
import type { File } from '../../types'
import { FirebaseStorage } from './firebase-storage.service'

@Injectable()
export class FireBaseUpload implements IFileUpload {
  constructor(private readonly firebaseStorage: FirebaseStorage) {}

  async upload(file: File, path: string): Promise<string> {
    const uploadedFile = await this.firebaseStorage.uploadFile(file, path)
    return uploadedFile
  }
}
