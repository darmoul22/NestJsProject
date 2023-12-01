import { PipeTransform, Injectable, NotFoundException } from '@nestjs/common'
import { CustomerRepository } from '../customer.repository'
import { Customer } from '@prisma/client'

@Injectable()
export class CustomerByIdPipe implements PipeTransform<number, Promise<Customer>> {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async transform(value: number) {
    const users = await this.customerRepository.getCustomerById(value)

    if (!users.length) {
      throw new NotFoundException(`Customer with ID ${value} not found`)
    }

    return users.shift()
  }
}
