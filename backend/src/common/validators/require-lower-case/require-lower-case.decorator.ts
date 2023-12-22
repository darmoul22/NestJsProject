import { registerDecorator, ValidationOptions } from 'class-validator'
import { RequireLowercaseValidator } from './require-lower-case-constraint.validator'

export function RequireLowercase(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'requireLowercase',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: RequireLowercaseValidator,
    })
  }
}
