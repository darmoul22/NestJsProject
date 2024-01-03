import { PartialType } from '@nestjs/swagger'
import { CreateServiceDto } from './create-service.dto'
import {IsNotEmpty, IsNumber, IsString} from 'class-validator'

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  @IsNumber()
  id: number
  @IsNotEmpty()
  @IsString()
  name: string
  @IsString()
  description: string
  @IsString()
  image: string
  @IsNotEmpty()
  createdAt: string
  @IsNotEmpty()
  updatedAt: string
}
