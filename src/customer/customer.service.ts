import { Injectable } from '@nestjs/common'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'
import { CustomerRepository } from './customer.repository'

@Injectable()
export class CustomerService {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = await this.customerRepository.createCustomer(createCustomerDto)
    return customer
  }

  async findAllByUser(userId: number) {
    const customers = await this.customerRepository.getCustomersByUserId(userId)
    return customers
  }

  async findCustomerById(id: number) {
    const customer = await this.customerRepository.getCustomerById(id)
    return customer
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
