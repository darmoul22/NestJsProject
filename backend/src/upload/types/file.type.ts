export type File = {
  name: string
  size: number
  type: string
  extension: string
  content: Blob | Uint8Array | ArrayBuffer
}
