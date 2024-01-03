import { BadRequestException, ForbiddenException, Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

import { SingnInDto, SingnUpDto } from '../dto'
import type { Tokens, UserPayload } from '../types'
import { HASHING_SERVICE, IHashingService } from 'src/iam/hashing/hashing.interface'
import { AuthRepository } from '../repository/auth.repository'
import { TokenManager } from 'src/iam/token-manager/token-manager.service'
import { ConfigKey, TokenConfigType } from 'src/common/config/env/app.config'

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly authRepository: AuthRepository,
    private readonly tokenManager: TokenManager<UserPayload>,
    @Inject(HASHING_SERVICE) private readonly hashingService: IHashingService,
  ) {}

  async signupLocal(dto: SingnUpDto): Promise<Tokens> {
    // Get email and password from dto
    const { email, password } = dto

    // Check if user with this email already exists
    const isEmailUserExists = await this.authRepository.getUserByEmail(email)
    if (isEmailUserExists) throw new BadRequestException(`Email ${email} already exists`)

    // Hash password
    const hash = await this.hashingService.hashPayload(password)

    // Create user
    const user = await this.authRepository.insert({
      email,
      hash,
    })

    // Get user payload
    const payload = this.getUserPayload(user)

    // Generate tokens
    const tokens = await this.getTokens(payload)

    // Update refresh token hash
    await this.updateRtHash(user.id, tokens.refresh_token)

    // Return tokens
    return tokens
  }

  async signinLocal(dto: SingnInDto): Promise<Tokens> {
    const { email, password } = dto

    // Check if user with this email already exists
    const user = await this.authRepository.getUserByEmail(email)
    if (!user) throw new BadRequestException(`Invalid email or password`)

    // Check if password matches
    const passwordMatches = await this.hashingService.compareHashPayload(password, user.hash)
    if (!passwordMatches) throw new BadRequestException(`Invalid email or password`)

    // Generate tokens
    const payload = this.getUserPayload(user)
    const tokens = await this.getTokens(payload)

    // Update refresh token hash
    await this.updateRtHash(user.id, tokens.refresh_token)

    return tokens
  }

  async logout(userId: number) {
    // Invalidate refresh token hash in db (set to null) if it exists (not null)
    await this.authRepository.invalidateRt(userId).catch(() => {
      throw new ForbiddenException('Access Denied')
    })
  }

  async refreshTokens(userId: number, rt: string): Promise<Tokens> {
    // Get user by id
    const user = await this.authRepository.getUserById(userId)
    if (!user?.hashedRt) throw new ForbiddenException('Access Denied')

    // Check if refresh token matches
    const rtMatches = await this.hashingService.compareHashPayload(rt, user.hashedRt)
    if (!rtMatches) throw new ForbiddenException('Access Denied')

    // Get user payload
    const payload = this.getUserPayload(user)

    // Generate tokens
    const tokens = await this.getTokens(payload)

    // Update refresh token hash
    await this.updateRtHash(user.id, tokens.refresh_token)

    return tokens
  }

  async updateRtHash(userId: number, rt: string): Promise<void> {
    const hash = await this.hashingService.hashPayload(rt)
    await this.authRepository.updateRtHash(userId, hash)
  }

  async getTokens(payload: UserPayload): Promise<Tokens> {
    const [access_token, refresh_token] = await Promise.all([
      this.tokenManager.generateToken(
        payload,
        this.config.get<TokenConfigType>(ConfigKey.TOKEN).access_token,
        this.config.get<TokenConfigType>(ConfigKey.TOKEN).access_token_expires_in,
      ),
      this.tokenManager.generateToken(
        payload,
        this.config.get<TokenConfigType>(ConfigKey.TOKEN).refresh_token,
        this.config.get<TokenConfigType>(ConfigKey.TOKEN).refresh_token_expires_in,
      ),
    ])

    return {
      access_token,
      refresh_token,
    }
  }

  private getUserPayload(user: UserPayload): UserPayload {
    const { id, email, role } = user
    return {
      id,
      email,
      role,
    }
  }
}
