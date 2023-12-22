import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { AuthService } from './service/auth.service'
import { AtStrategy, RtStrategy } from './strategies'
import { IamModule } from 'src/iam/iam.module'
import { AuthRepository } from './repository/auth.repository'

@Module({
  imports: [IamModule],
  controllers: [AuthController],
  providers: [AuthService, RtStrategy, AtStrategy, AuthRepository],
})
export class AuthModule {}
