export const padSingleDigit = (number: number) => {
  return number < 10 ? `0${number}` : number.toString()
}

export const isStringInteger = (val: string) => {
  const integerPattern = /^-?(0|[1-9]\d*)$/
  return integerPattern.test(val)
}

export const isStringPositiveInteger = (val: string) => {
  const positivePattern = /^(0|[1-9]\d*)$/
  return positivePattern.test(val)
}

export const isStringFinitePositiveInteger = (val: string) => {
  return isStringInteger(val) && isStringPositiveInteger(val) && Number.isFinite(+val)
}
