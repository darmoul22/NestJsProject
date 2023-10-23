import { ValidationError } from 'class-validator'
import { LooseObject } from '../types'

/* Override the default reponse of class-validation */
export const collectAttributeErrors = (validationErrors: ValidationError[] = []) => {
  const errObject: LooseObject = {}

  return validationErrors.reduce((accumulator, validationError) => {
    const errPropertyName = validationError.property
    const errConstraints = validationError.constraints

    const errorMessages = Object.keys(errConstraints).map((value, index) => ({
      id: index + 1,
      message: errConstraints[value],
    }))

    accumulator[errPropertyName] = errorMessages

    return accumulator
  }, errObject)
}
