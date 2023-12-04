import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { CustomerModule } from './customer/customer.module'
import { ServiceModule } from './service/service.module'
import { AppointmentModule } from './appointment/appointment.module'
import { filters } from './common/config/filters.config'
import { guards } from './common/config/guards.config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    CustomerModule,
    ServiceModule,
    AppointmentModule,
  ],
  providers: [...guards, ...filters],
})
export class AppModule {}
