import { PartialType } from '@nestjs/swagger'
import { CreateAppointmentDto } from './create-appointment.dto'
import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator'

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  @IsDateString()
  @IsNotEmpty()
  startDate: Date

  @IsDateString()
  @IsNotEmpty()
  endDate: Date

  @IsString()
  @IsNotEmpty()
  description: string

  @IsInt()
  customerId: number

  @IsInt()
  serviceId: number
}
