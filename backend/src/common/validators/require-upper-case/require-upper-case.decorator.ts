import { registerDecorator, ValidationOptions } from 'class-validator'
import { RequireUppercaseValidator } from './require-upper-case.validator'

export function RequireUppercase(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'requireUppercase',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: RequireUppercaseValidator,
    })
  }
}
