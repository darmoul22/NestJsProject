import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { PrismaModule } from './prisma/prisma.module'
import { CustomerModule } from './customer/customer.module'
import { ServiceModule } from './service/service.module'
import { AppointmentModule } from './appointment/appointment.module'
import { filters } from './common/config/filters.config'
import { guards } from './common/config/guards.config'
import { validateConfig } from './common/config/env/config-validation'
import { configurations } from './common/config/env/app.config'
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateConfig, load: configurations }),
    PrismaModule,
    AuthModule,
    CustomerModule,
    ServiceModule,
    AppointmentModule,
    FileUploadModule,
  ],
  providers: [...guards, ...filters],
})
export class AppModule {}
