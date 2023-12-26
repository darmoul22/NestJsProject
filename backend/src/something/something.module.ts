import { Module } from '@nestjs/common'
import { SomethingController } from './something.controller'
import { UploadModule } from 'src/upload/upload.module'

@Module({
  imports: [UploadModule],
  controllers: [SomethingController],
  providers: [],
})
export class SomethingModule {}
