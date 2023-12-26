import type { File } from '../types'

export interface IFileUpload {
  upload: (files: File, path: string) => Promise<string>
}

export const UPLOAD_FILE_SERVICE = Symbol('IFileUpload')
