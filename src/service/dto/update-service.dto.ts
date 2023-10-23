import { PartialType } from '@nestjs/swagger'
import { CreateServiceDto } from './create-service.dto'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @IsNotEmpty()
  @IsString()
  name: string
  @IsString()
  description: string
}
