import { Injectable } from '@nestjs/common'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'
import { CustomerRepository } from './customer.repository'

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async create(createCustomerDto: CreateCustomerDto) {
    return this.customerRepository.createCustomer(createCustomerDto)
  }

  async findAllByUser(userId: number) {
    return this.customerRepository.getCustomersByUserId(userId)
  }

  async findCustomerById(id: number) {
    return this.customerRepository.getCustomerById(id)
  }

  async updateCustomer(id: number, updateCustomerDto: UpdateCustomerDto) {
    await this.customerRepository.updateCustomer(id, updateCustomerDto)
    return { message: `Customer with ${id} has been updated` }
  }

  async deleteCustomer(id: number) {
    await this.customerRepository.deleteCustomerById(id)
    return { message: `Customer with ${id} has been deleted` }
  }
}
