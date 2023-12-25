import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common'

import { Public, GetCurrentUserId, GetCurrentUser } from '../common/decorators'
import { RtGuard } from '../common/guards'
import { AuthService } from './service/auth.service'
import { SingnInDto, SingnUpDto } from './dto'
import type { Tokens } from './types'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger'
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'src/common/constants/guard'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBadRequestResponse({ description: 'Form validation failed' })
  @ApiCreatedResponse({ description: 'User successfully signed up' })
  @Public()
  @Post('local/sign-up')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: SingnUpDto): Promise<Tokens> {
    return this.authService.signupLocal(dto)
  }

  @ApiBadRequestResponse({ description: 'No user with such email or password' })
  @ApiOkResponse({ description: 'User successfully signed in' })
  @Public()
  @Post('local/sign-in')
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: SingnInDto): Promise<Tokens> {
    return this.authService.signinLocal(dto)
  }

  @ApiSecurity(ACCESS_TOKEN)
  @ApiForbiddenResponse({ description: 'Invalid refresh token' })
  @ApiNoContentResponse({ description: 'User successfully logged out' })
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@GetCurrentUserId() userId: number): Promise<void> {
    return this.authService.logout(userId)
  }

  @ApiSecurity(REFRESH_TOKEN)
  @ApiForbiddenResponse({ description: 'Invalid refresh token' })
  @ApiOkResponse({ description: 'Tokens successfully refreshed' })
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
