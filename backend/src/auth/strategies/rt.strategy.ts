import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request } from 'express'
import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import type { JwtPayloadWithRt, UserPayload } from '../types'
import { REFRESH_TOKEN } from 'src/common/constants/guard'
import { ConfigKey, type TokenConfigType } from 'src/common/config/env/app.config'

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, REFRESH_TOKEN) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<TokenConfigType>(ConfigKey.TOKEN).refresh_token,
      passReqToCallback: true,
    })
  }

  validate(req: Request, payload: UserPayload): JwtPayloadWithRt {
    const refreshToken = req?.get('authorization')?.replace('Bearer', '').trim()

    if (!refreshToken) throw new ForbiddenException('Refresh token malformed')

    return {
      ...payload,
      refreshToken,
    }
  }
}
