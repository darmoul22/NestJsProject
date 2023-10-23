import { BadRequestException, ValidationError } from '@nestjs/common'
import { collectAttributeErrors } from '../utils/validation-form-class.util'

export const validationPipeOptions = {
  transform: true,
  transformOptions: { enableImplicitConversion: true },
  exceptionFactory: (validationErrors: ValidationError[] = []) => {
    const errObject = collectAttributeErrors(validationErrors)
    return new BadRequestException(errObject)
  },
}
