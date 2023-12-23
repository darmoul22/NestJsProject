import { ApiProperty, OmitType } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { SingnUpDto } from './sign-up.dto'

export class SingnInDto extends OmitType(SingnUpDto, ['password'] as const) {
  @ApiProperty({ example: 'Strong_Password@123', description: 'User password' })
  @IsNotEmpty()
  @IsString()
  password: string
}
