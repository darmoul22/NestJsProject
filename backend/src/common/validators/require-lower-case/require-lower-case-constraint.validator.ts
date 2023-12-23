import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

@ValidatorConstraint({ name: 'RequireLowercaseValidator', async: false })
export class RequireLowercaseValidator implements ValidatorConstraintInterface {
  validate(value: any) {
    const lowercaseRegex = /[a-z]/
    return lowercaseRegex.test(value)
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must contain at least one lowercase character`
  }
}
