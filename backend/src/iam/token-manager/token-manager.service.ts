import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class TokenManager<T extends { id: number }> {
  constructor(private readonly jwtService: JwtService) {}

  public async generateToken(payload: T, secret: string, expiresIn: string): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret,
      expiresIn,
    })
  }
}
