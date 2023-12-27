import { Module } from '@nestjs/common'
import { ServiceService } from './services/service.service'
import { ServiceController } from './controller/service.controller'
import {ServiceRepository} from "./repository/service.repository";

@Module({
  controllers: [ServiceController],
  providers: [ServiceService, ServiceRepository],
})
export class ServiceModule {}
