/* eslint-env mocha */
const validateEmail = require('./validateEmail')
// eslint-disable-next-line
const should = require('should')

describe('validateEmail function', () => {
  it('should be able to validate right email address', () => {
    const email = 'google@gmail.com'

    const result = validateEmail(email)

    result.should.be.true()
  })

  it('should be able to validate wrong email address', () => {
    const email = 'google.gmail.com'

    const result = validateEmail(email)

    result.should.be.false()
  })
})
