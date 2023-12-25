import { AppModule } from './app.module'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { NestExpressApplication } from '@nestjs/platform-express'
import { corsOptions } from './common/config/cors.config'
import { ValidationPipe } from '@nestjs/common'
import { validationPipeOptions } from './common/config/validation-form-class.config'
import { SwaggerModule } from '@nestjs/swagger'
import { swaggerConfig } from './common/config/swagger.config'
import { useContainer } from 'class-validator'
import { ConfigKey, type AppConfigType } from './common/config/env/app.config'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const config: ConfigService = app.get(ConfigService)
  const port = config.get<AppConfigType>(ConfigKey.APP).port

  app.useGlobalPipes(new ValidationPipe(validationPipeOptions))
  app.disable('x-powered-by')
  app.enableCors(corsOptions)

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)

  useContainer(app.select(AppModule), { fallbackOnErrors: true })
  await app.listen(port)
}

bootstrap()
