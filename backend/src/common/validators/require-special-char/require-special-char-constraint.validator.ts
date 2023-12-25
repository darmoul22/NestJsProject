import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

@ValidatorConstraint({ name: 'RequireSpecialCharsValidator', async: false })
export class RequireSpecialCharsValidator implements ValidatorConstraintInterface {
  validate(value: any) {
    const requireSpecialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/
    return requireSpecialCharsRegex.test(value)
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must contain at least one special character`
  }
}
