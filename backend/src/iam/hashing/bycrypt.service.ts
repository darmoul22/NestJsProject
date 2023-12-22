import { Injectable } from '@nestjs/common'
import { IHashingService } from './hashing.interface'
import { genSalt, hash, compare } from 'bcrypt'

@Injectable()
export class BycryptService implements IHashingService {
  async hashPayload(payload: string | Buffer): Promise<string> {
    const salt = await genSalt()
    return hash(payload, salt)
  }

  async compareHashPayload(payload: string | Buffer, hashedPayload: string): Promise<boolean> {
    return compare(payload, hashedPayload)
  }
}
