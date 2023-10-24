import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    await this.checkCustomerAppointmentOverlapBeforeCreate(
      createAppointmentDto,
    );
    await this.checkUserAppointmentOverlapBeforeCreate(createAppointmentDto);
    await this.checkServiceAppointmentOverlapBeforeCreate(createAppointmentDto);
    const appointment = await this.prisma.appointment
      .create({
        data: {
          ...createAppointmentDto,
        },
      })
      .catch((err) => {
        throw err;
      });
    if (!appointment) {
      throw new BadRequestException('error adding appointment');
    }
    return appointment;
  }
  async getAppointmentsByUserId(userId: number, startDate?: Date) {
    return await this.prisma.appointment
      .findMany({
        where: {
          userId,
          startDate: startDate ? { gte: startDate } : undefined,
        },
      })
      .catch((err) => {
        throw err;
      });
  }
  async getAppointmentsByServiceId(serviceId: number, startDate?: Date) {
    return await this.prisma.appointment
      .findMany({
        where: {
          serviceId,
          startDate: startDate ? { gte: startDate } : undefined,
        },
      })
      .catch((err) => {
        throw err;
      });
  }
  async getAppointmentsByCustomerId(customerId: number, startDate?: Date) {
    return await this.prisma.appointment
      .findMany({
        where: {
          customerId,
          startDate: startDate ? { gte: startDate } : undefined,
        },
      })
      .catch((err) => {
        throw err;
      });
  }
  async findOne(id: number) {
    const appointment = this.prisma.appointment
      .findUnique({
        where: { id },
      })
      .catch((err) => {
        throw err;
      });
    if (!appointment) {
      throw new NotFoundException('appointment not found');
    }
    return appointment;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = this.prisma.appointment
      .update({
        where: { id },
        data: { ...updateAppointmentDto },
      })
      .catch((err) => {
        throw err;
      });
    if (!appointment) {
      throw new Error('Error creating customer');
    } else {
      return appointment;
    }
  }

  async remove(id: number) {
    const appointment = await this.prisma.appointment
      .findUnique({
        where: { id },
      })
      .catch((err) => {
        throw err;
      });
    if (!appointment) {
      throw new NotFoundException('appointment not found');
    }
    await this.prisma.appointment.delete({
      where: { id },
    });
    return { data: 'deleted' };
  }

  async checkUserAppointmentOverlapBeforeCreate(
    newAppointment: CreateAppointmentDto,
  ) {
    const overlappingAppointments = await this.prisma.appointment.findMany({
      where: {
        userId: newAppointment.userId,
        AND: [
          { startDate: { lte: newAppointment.endDate } },
          { endDate: { gte: newAppointment.startDate } },
        ],
      },
    });

    if (overlappingAppointments.length > 0) {
      throw new ConflictException('User has overlapping appointments.');
    }
  }
  async checkCustomerAppointmentOverlapBeforeCreate(
    newAppointment: CreateAppointmentDto,
  ) {
    const overlappingAppointments = await this.prisma.appointment.findMany({
      where: {
        customerId: newAppointment.customerId,
        AND: [
          { startDate: { lte: newAppointment.endDate } },
          { endDate: { gte: newAppointment.startDate } },
        ],
      },
    });

    if (overlappingAppointments.length > 0) {
      throw new ConflictException('Customer has overlapping appointments.');
    }
  }
  async checkServiceAppointmentOverlapBeforeCreate(
    newAppointment: CreateAppointmentDto,
  ) {
    const overlappingAppointments = await this.prisma.appointment.findMany({
      where: {
        serviceId: newAppointment.serviceId,
        AND: [
          { startDate: { lte: newAppointment.endDate } },
          { endDate: { gte: newAppointment.startDate } },
        ],
      },
    });

    if (overlappingAppointments.length > 0) {
      throw new ConflictException('Service has overlapping appointments.');
    }
  }
}
