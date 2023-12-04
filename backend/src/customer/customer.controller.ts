import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common'
import { CustomerService } from './customer.service'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'
import { GetCurrentUserId } from '../common/decorators'
import { ParseFinitePositiveIntPipe } from 'src/common/pipes'
import { CustomerByIdPipe } from './pipes'
import { Customer } from '@prisma/client'

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto)
  }

  @Get(':id/users')
  findAllByUser(@GetCurrentUserId() userId: number) {
    return this.customerService.findAllByUser(userId)
  }

  @Get(':id')
  findOne(
    @Param('id', ParseFinitePositiveIntPipe, CustomerByIdPipe)
    customer: Customer,
  ) {
    return customer
  }

  @Patch(':id')
  update(
    @Param('id', ParseFinitePositiveIntPipe) id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.updateCustomer(id, updateCustomerDto)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseFinitePositiveIntPipe) id: number) {
    return this.customerService.deleteCustomer(id)
  }
}
