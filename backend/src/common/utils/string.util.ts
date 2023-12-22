function isGivenValueAString(value: unknown): boolean {
  return typeof value === 'string' || value instanceof String
}

function isGivenValueAnEmptyString(value: unknown): boolean {
  return value === '' || value === null || value === undefined
}

const StringUtil = {
  isGivenValueAString,
  isGivenValueAnEmptyString,
}

export default StringUtil
