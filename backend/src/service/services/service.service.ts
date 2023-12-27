import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateServiceDto } from '../dto/create-service.dto'
import { UpdateServiceDto } from '../dto/update-service.dto'
import {ServiceRepository} from "../repository/service.repository";

@Injectable()
export class ServiceService {
  constructor(private serviceRepo: ServiceRepository) {}
  async create(createServiceDto: CreateServiceDto) {
    return await this.serviceRepo.createService(createServiceDto);
  }

  async findAll() {
    return await this.serviceRepo.findAll()
  }

  async findOne(id: number) {
    return  await this.serviceRepo.findOne(id);
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    return await this.serviceRepo.updateService(id,updateServiceDto)
  }

  async remove(id: number) {
    const service = await this.serviceRepo.findOne(id)
    if (!service) {
      throw new NotFoundException('service not found')
    }
    await this.serviceRepo.deleteService(id)
    return { data: 'deleted' }
  }
}
