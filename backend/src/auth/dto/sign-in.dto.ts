import { IsNotEmpty, IsString } from 'class-validator'

export class SingnInDto {
  @IsNotEmpty()
  @IsString()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}
