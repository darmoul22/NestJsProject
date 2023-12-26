import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common'
import { Public } from 'src/common/decorators'
import { IFileUpload, UPLOAD_FILE_SERVICE } from 'src/upload/services/upload.interface'
import FileUtil from 'src/upload/util/file.util'

@Controller('something')
export class SomethingController {
  constructor(@Inject(UPLOAD_FILE_SERVICE) private readonly fileUploadProvider: IFileUpload) {}

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  async getSomething() {
    const filePath = `${process.cwd()}/src/common/config/firebase/example.jpg`
    const file = FileUtil.readFile(filePath)
    const uploadedFile = await this.fileUploadProvider.upload(file, 'something')
    return uploadedFile
  }
}
