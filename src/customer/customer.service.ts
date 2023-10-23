import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}
  async create(createCustomerDto: CreateCustomerDto) {
    const customer = await this.prisma.customer
      .create({
        data: {
          ...createCustomerDto,
        },
      })
      .catch(() => {
        throw new Error('Error creating customer');
      });
    if (!customer) {
      throw new Error('Error creating customer');
    } else {
      return customer;
    }
  }

  async findAllByUser(userId: number) {
    const customers = await this.prisma.customer
      .findMany({
        where: {
          userId,
        },
      })
      .catch((err) => {
        throw new Error(err);
      });
    if (!customers) throw new Error('Error finding customers by userId');
    return customers;
  }

  async findOne(id: number) {
    const customer = await this.prisma.customer
      .findUnique({
        where: { id },
      })
      .catch(() => {
        throw new Error('cannot find customer');
      });
    if (!customer) {
      throw new NotFoundException('Does not exist');
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.prisma.customer
      .update({
        where: {
          id: id,
        },
        data: {
          ...updateCustomerDto,
        },
      })
      .catch(() => {
        throw new Error('Error creating customer');
      });
    if (!customer) {
      throw new Error('Error creating customer');
    } else {
      return customer;
    }
  }

  async remove(id: number) {
    const customer = await this.prisma.customer
      .findUnique({
        where: { id },
      })
      .catch(() => {
        throw new Error('Error deleting customer');
      });
    if (!customer) {
      throw new NotFoundException('Patient not found');
    }
    await this.prisma.customer.delete({
      where: { id },
    });
    return { data: 'deleted' };
  }
}
