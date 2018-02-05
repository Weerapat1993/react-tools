import { createValidator, required, email, minLength, maxLength } from '../utils';

// Login Form Validation
export const loginValidation = createValidator({
  email: [required, email, minLength(6), maxLength(255)],
  password: [required, minLength(6), maxLength(24)],
})

export const searchValidation = createValidator({
  value: [required, minLength(3), maxLength(255)],
})

