import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

@ValidatorConstraint({ name: 'RequireUppercaseValidator', async: false })
export class RequireUppercaseValidator implements ValidatorConstraintInterface {
  validate(value: any, _args: ValidationArguments) {
    const requireUppercaseRegex = /[A-Z]/
    return requireUppercaseRegex.test(value)
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must contain at least one uppercase character`
  }
}
