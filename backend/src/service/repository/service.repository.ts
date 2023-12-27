import {Injectable, NotFoundException} from "@nestjs/common";
import {PrismaService} from "../../prisma/prisma.service";
import {CreateServiceDto} from "../dto/create-service.dto";
import {UpdateServiceDto} from "../dto/update-service.dto";

@Injectable()
export class ServiceRepository{
    constructor(private readonly  prisma: PrismaService) {}

    async createService(createServiceDto: CreateServiceDto){
        const service =  await this.prisma.service.create({
            data: {
                ...createServiceDto,
            },
        })
        if (!service) {
            throw new Error('Error creating customer')
        }
        return service;
    }

    async findAll(){
        const services = await this.prisma.service.findMany()
            .catch((err) => {
            throw err
        })
        if (!services) {
            throw new NotFoundException('no services')
        }
        return services
    }
    async findOne(id: number){
        const service = await this.prisma.service.findUnique({
            where: { id },
        })
        if (!service) {
            throw new NotFoundException('no service found')
        }
        return service
    }

    async updateService(id: number, updateServiceDto: UpdateServiceDto){
        const service = await this.prisma.service.update({
            where: { id },
            data: { ...updateServiceDto },
        })
        if (!service) {
            throw new NotFoundException('service not found')
        }
        return service
    }
    async deleteService(id: number){
        return await this.prisma.service.delete({
            where: { id },
        })
    }
}