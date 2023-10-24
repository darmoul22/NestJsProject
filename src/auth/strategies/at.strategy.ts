import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JwtPayload } from '../types'
import { ACCESS_TOKEN } from 'src/common/constants/guard'

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, ACCESS_TOKEN) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('AT_SECRET'),
    })
  }

  validate(payload: JwtPayload) {
    return payload
  }
}
