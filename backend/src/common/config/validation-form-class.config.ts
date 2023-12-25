import {
  BadRequestException,
  HttpStatus,
  ValidationError,
  ValidationPipeOptions,
} from '@nestjs/common'
import { collectAttributeErrors } from '../utils/validation-form-class.util'

export const validationPipeOptions: ValidationPipeOptions = {
  transform: true,
  transformOptions: { enableImplicitConversion: true },
  exceptionFactory: (validationErrors: ValidationError[] = []): BadRequestException => {
    const errObject = collectAttributeErrors(validationErrors)
    return new BadRequestException(errObject)
  },
  errorHttpStatusCode: HttpStatus.BAD_REQUEST,
  whitelist: true,
  forbidNonWhitelisted: true,
}
