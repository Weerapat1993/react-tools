export const validation = {
  email: 'Invalid email address',
  required: 'Required',
  minLength: (min) => `Must be at least ${min} characters`,
  maxLength: (max) => `Must be no more than ${max} characters`,
  integer: 'Must be an integer',
  match: 'Do not match',
  oneOf: (enumeration) => `Must be one of: ${enumeration.join(', ')}`,
}