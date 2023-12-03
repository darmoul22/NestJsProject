import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateAppointmentDto } from './dto/create-appointment.dto'

@Injectable()
export class AppointmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAppointment(createAppointmentDto: CreateAppointmentDto) {
    return this.prisma.appointment.create({
      data: {
        ...createAppointmentDto,
      },
    })
  }

  async getAppointmentsByUserId(userId: number, startDate?: Date) {
    return this.prisma.appointment.findMany({
      where: {
        userId,
        startDate: startDate ? { gte: startDate } : undefined,
      },
    })
  }
  async getAppointmentsByServiceId(serviceId: number, startDate?: Date) {
    return this.prisma.appointment.findMany({
      where: {
        serviceId,
        startDate: startDate ? { gte: startDate } : undefined,
      },
    })
  }
  async getAppointmentsByCustomerId(customerId: number, startDate?: Date) {
    return this.prisma.appointment.findMany({
      where: {
        customerId,
        startDate: startDate ? { gte: startDate } : undefined,
      },
    })
  }
}
