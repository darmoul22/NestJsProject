export interface IHashingService {
  hashPayload(payload: string | Buffer): Promise<string>
  compareHashPayload(payload: string | Buffer, hashedPayload: string): Promise<boolean>
}

export const HASHING_SERVICE = Symbol('IHashingService')
