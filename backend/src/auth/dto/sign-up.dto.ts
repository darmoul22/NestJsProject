import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'
import { RequireLowercase } from 'src/common/validators/require-lower-case/require-lower-case.decorator'
import { RequireNumbers } from 'src/common/validators/require-number/require-number.decorator'
import { RequireSpecialChars } from 'src/common/validators/require-special-char/require-special-char.decorator'
import { RequireUppercase } from 'src/common/validators/require-upper-case/require-upper-case.decorator'

export class SingnUpDto {
  @IsNotEmpty()
  @IsString()
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(8, { message: 'Password is too short (8 characters min)' })
  @MaxLength(20, { message: 'Password is too long (20 characters max)' })
  @RequireLowercase()
  @RequireUppercase()
  @RequireNumbers()
  @RequireSpecialChars()
  password: string
}
