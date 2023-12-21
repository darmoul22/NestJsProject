import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

@ValidatorConstraint({ name: 'RequireNumbersValidator', async: false })
export class RequireNumbersValidator implements ValidatorConstraintInterface {
  validate(value: any, _args: ValidationArguments) {
    const requireNumbersRegex = /\d/
    return requireNumbersRegex.test(value)
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must contain at least one number`
  }
}
