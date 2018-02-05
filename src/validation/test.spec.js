import { loginValidation } from './index'

describe('test', () => {
  it('loginValidation', () => {
    const form = {
      email: 'test',
      password: 'test1234',
    }
    const recieved = loginValidation(form)
    expect(recieved).toEqual({})
  })
})