import { DocumentBuilder } from '@nestjs/swagger'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/guard'

export const swaggerConfig = new DocumentBuilder()
  .setTitle('API example')
  .setDescription('API description')
  .setContact('API contact', 'https://www.google.com', 'John Doe')
  .setTermsOfService('https://www.google.com')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT access token',
      description: 'Enter JWT access token',
      in: 'header',
    },
    ACCESS_TOKEN,
  )
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT refresh token',
      description: 'Enter JWT refresh token',
      in: 'header',
    },
    REFRESH_TOKEN,
  )
  .setLicense('Apache 2.0', 'https://www.apache.org/licenses/LICENSE-2.0.html')
  .setVersion('1.0.0')
  .build()
