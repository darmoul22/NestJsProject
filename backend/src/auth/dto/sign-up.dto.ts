import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'
import { RequireLowercase } from 'src/common/validators/require-lower-case/require-lower-case.decorator'
import { RequireNumbers } from 'src/common/validators/require-number/require-number.decorator'
import { RequireSpecialChars } from 'src/common/validators/require-special-char/require-special-char.decorator'
import { RequireUppercase } from 'src/common/validators/require-upper-case/require-upper-case.decorator'

export class SingnUpDto {
  @ApiProperty({ example: 'Jhon@gmail.com', description: 'User name' })
  @IsNotEmpty()
  @IsString()
  email: string

  @ApiProperty({ example: 'Strong_Password@123', description: 'User password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password is too short (8 characters min)' })
  @MaxLength(25, { message: 'Password is too long (25 characters max)' })
  @RequireLowercase()
  @RequireUppercase()
  @RequireNumbers()
  @RequireSpecialChars()
  password: string
}
