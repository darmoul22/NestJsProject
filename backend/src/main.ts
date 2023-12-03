import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express'
import { corsOptions } from './common/config/cors.config'
import { ValidationPipe } from '@nestjs/common'
import { validationPipeOptions } from './common/config/validation-form-class.config'
import { SwaggerModule } from '@nestjs/swagger'
import { swaggerConfig } from './common/config/swagger.config'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const config: ConfigService = app.get(ConfigService)
  const port = config.get<number>('BACK_END_HOST_PORT') || 9000

  app.useGlobalPipes(new ValidationPipe(validationPipeOptions))
  app.disable('x-powered-by')
  app.enableCors(corsOptions)

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)

  await app.listen(port)
}

bootstrap()
