import { Injectable } from '@nestjs/common'
import { IHashingService } from './hashing.interface'
import { hash, verify } from 'argon2'

@Injectable()
export class ArgonService implements IHashingService {
  async hashPayload(password: string | Buffer): Promise<string> {
    return hash(password)
  }

  async compareHashPayload(password: string | Buffer, hashedPassword: string): Promise<boolean> {
    return verify(hashedPassword, password)
  }
}
