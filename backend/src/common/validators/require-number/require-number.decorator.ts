import { registerDecorator, ValidationOptions } from 'class-validator'
import { RequireNumbersValidator } from './require-number-constraint.validator'

export function RequireNumbers(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'requireNumbers',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: RequireNumbersValidator,
    })
  }
}
