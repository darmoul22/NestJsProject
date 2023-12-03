import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsString } from 'class-validator'

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  firstName: string

  @IsString()
  @IsNotEmpty()
  lastName: string

  @IsNumberString()
  phoneNum: string

  @IsEmail()
  email: string

  @IsString()
  description: string

  @IsNotEmpty()
  @IsNumber()
  userId: number
}
