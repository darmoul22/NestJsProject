import {IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString} from 'class-validator'

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

  @IsOptional()
  image: string

  @IsString()
  description: string

  @IsNotEmpty()
  @IsNumber()
  userId: number
}
