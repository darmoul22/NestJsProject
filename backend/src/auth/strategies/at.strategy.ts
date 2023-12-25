import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ACCESS_TOKEN } from 'src/common/constants/guard'
import type { UserPayload } from '../types'
import { ConfigKey, type TokenConfigType } from 'src/common/config/env/app.config'

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, ACCESS_TOKEN) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<TokenConfigType>(ConfigKey.TOKEN).access_token,
    })
  }

  validate(payload: UserPayload) {
    return payload
  }
}
