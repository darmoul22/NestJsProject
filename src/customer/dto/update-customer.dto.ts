import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator'

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.firstName !== undefined)
  @IsNotEmpty()
  firstName: string;

  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.lastName !== undefined)
  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  @IsNumberString()
  @ValidateIf((o) => o.phoneNum !== undefined)
  phoneNum: string;

  @IsOptional()
  @ValidateIf((o) => o.email !== undefined)
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.description !== undefined)
  description: string;

  @IsNotEmpty()
  @ValidateIf((o) => o.userId !== undefined)
  @IsNumber()
  userId: number;
}
