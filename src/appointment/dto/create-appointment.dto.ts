import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator'

export class CreateAppointmentDto {
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
