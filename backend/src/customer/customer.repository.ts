import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'

@Injectable()
export class CustomerRepository {
  constructor(private readonly prisma: PrismaService) {}

  createCustomer(createCustomerDto: CreateCustomerDto) {
    return this.prisma.customer.create({
      data: {
        ...createCustomerDto,
      },
    })
  }

  getCustomersByUserId(userId: number) {
    return this.prisma.customer.findMany({
      where: {
        userId,
      },
    })
  }

  getCustomerById(id: number) {
    return this.prisma.customer.findMany({
      where: {
        id,
      },
    })
  }

  getCustomerByPhoneNumber(phone: string) {
    return this.prisma.customer.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phoneNum: true,
      },
      where: {
        phoneNum: phone,
      },
    })
  }

  updateCustomer(id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.prisma.customer.update({
      where: {
        id: id,
      },
      data: {
        ...updateCustomerDto,
      },
    })
  }

  deleteCustomerById(id: number) {
    return this.prisma.customer.delete({
      where: { id },
    })
  }
}
