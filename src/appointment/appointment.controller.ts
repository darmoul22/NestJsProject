import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get('user/:userId')
  findAllByUserId(
    @Param('userId') userId: string,
    @Query('startDate') startDate?: string,
  ) {
    const parsedStartDate = startDate ? new Date(startDate) : undefined;
    return this.appointmentService.getAppointmentsByUserId(
      +userId,
      parsedStartDate,
    );
  }

  @Get('service/:serviceId')
  findAllByServiceId(
    @Param('serviceId') serviceId: string,
    @Query('startDate') startDate?: string,
  ) {
    const parsedStartDate = startDate ? new Date(startDate) : undefined;
    return this.appointmentService.getAppointmentsByServiceId(
      +serviceId,
      parsedStartDate,
    );
  }

  @Get('customer/:customerId')
  findAllByCustomerId(
    @Param('customerId') customerId: string,
    @Query('startDate') startDate?: string,
  ) {
    const parsedStartDate = startDate ? new Date(startDate) : undefined;
    return this.appointmentService.getAppointmentsByCustomerId(
      +customerId,
      parsedStartDate,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }
}
