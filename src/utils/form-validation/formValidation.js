import validationMsg from './lang'

const isEmpty = value => value === undefined || value === null || value === ''
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0 /* first error */ ]

export const email = (value) => {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return validationMsg.email
  }
}

export const required = (value) => {
  if (isEmpty(value)) {
    return validationMsg.required
  }
}

export const minLength = (min) => {
  return value => {
    if (!isEmpty(value) && value.length < min) {
      return validationMsg.minLength(min)
    }
  }
}

export const maxLength = (max) => {
  return value => {
    if (!isEmpty(value) && value.length > max) {
      return validationMsg.maxLength(max)
    }
  }
}

export const integer = (value) => {
  if (!Number.isInteger(Number(value))) {
    return validationMsg.integer
  }
}

export const oneOf = (enumeration) => {
  return value => {
    if (!~enumeration.indexOf(value)) {
      return validationMsg.oneOf(enumeration)
    }
  }
}

export const match = (field) => {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return validationMsg.match
      }
    }
  }
}

export const createValidator = (rules) => {
  return (data = {}) => {
    const errors = {}
    Object.keys(rules).forEach((key) => {
      const rule = join([].concat(rules[key])) // concat enables both functions and arrays of functions
      const error = rule(data[key], data)
      if (error) {
        errors[key] = error
      }
    })
    return errors
  }
}