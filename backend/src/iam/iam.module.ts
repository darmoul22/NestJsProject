import { Module } from '@nestjs/common'
import { HASHING_SERVICE } from './hashing/hashing.interface'
import { JwtModule } from '@nestjs/jwt'
import { TokenManager } from './token-manager/token-manager.service'
import { BycryptService } from './hashing/bycrypt.service'

@Module({
  imports: [JwtModule.register({})],
  providers: [
    {
      useClass: BycryptService,
      provide: HASHING_SERVICE,
    },
    TokenManager,
    /*
    {
      useClass: BycryptService,
      provide: HASHING_SERVICE,
    },
    */
  ],
  exports: [HASHING_SERVICE, TokenManager],
})
export class IamModule {}
