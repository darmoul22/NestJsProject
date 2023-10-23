import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateServiceDto } from './dto/create-service.dto'
import { UpdateServiceDto } from './dto/update-service.dto'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class ServiceService {
  constructor(private prisma: PrismaService) {}
  async create(createServiceDto: CreateServiceDto) {
    const service = await this.prisma.service
      .create({
        data: {
          ...createServiceDto,
        },
      })
      .catch((error) => {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            // Unique constraint violation
            console.log('Name already exists')
            console.log(error.meta)
            // Provide user-friendly error message
          }
        } else throw new Error('error')
      })
    if (!service) {
      throw new Error('Error creating customer')
    } else {
      return service
    }
  }

  async findAll() {
    const services = await this.prisma.service.findMany().catch((err) => {
      throw err
    })
    if (!services) {
      throw new NotFoundException('no services')
    }
    return services
  }

  async findOne(id: number) {
    const service = await this.prisma.service
      .findUnique({
        where: { id },
      })
      .catch((err) => {
        throw err
      })
    if (!service) {
      throw new NotFoundException('no service')
    }
    return service
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const service = await this.prisma.service
      .update({
        where: { id },
        data: { ...updateServiceDto },
      })
      .catch((err) => {
        throw err
      })
    if (!service) {
      throw new NotFoundException('service not found')
    }
    return service
  }

  async remove(id: number) {
    const service = await this.prisma.service
      .findUnique({
        where: { id },
      })
      .catch((err) => {
        throw err
      })
    if (!service) {
      throw new NotFoundException('service not found')
    }
    await this.prisma.service.delete({
      where: { id },
    })
    return { data: 'deleted' }
  }
}
