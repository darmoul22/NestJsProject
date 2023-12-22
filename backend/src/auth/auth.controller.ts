import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'

import { Public, GetCurrentUserId, GetCurrentUser } from '../common/decorators'
import { RtGuard } from '../common/guards'
import { AuthService } from './service/auth.service'
import { SingnInDto, SingnUpDto } from './dto'
import type { Tokens } from './types'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: SingnUpDto): Promise<Tokens> {
    return this.authService.signupLocal(dto)
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: SingnInDto): Promise<Tokens> {
    return this.authService.signinLocal(dto)
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@GetCurrentUserId() userId: number) {
    this.authService.logout(userId)
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken)
  }
}
