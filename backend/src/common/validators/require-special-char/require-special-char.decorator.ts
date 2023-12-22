import { registerDecorator, ValidationOptions } from 'class-validator'
import { RequireSpecialCharsValidator } from './require-special-char-constraint.validator'

export function RequireSpecialChars(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'requireSpecialChars',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: RequireSpecialCharsValidator,
    })
  }
}
