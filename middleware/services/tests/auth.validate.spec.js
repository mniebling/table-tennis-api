const _ = require('lodash')
const expect = require('chai').expect
const validate = require('../auth.validate')


describe('middleware/auth.validate', () => {

  it('should return null if no failures', () => {

    var authHeader = 'Bearer foo'
    var validationResult = validate(authHeader)

    expect(validationResult).to.be.null
  })

  it('should reject missing headers', () => {

    var authHeader = null
    var validationResult = validate(authHeader)

    var output = validate(authHeader)

    expect(output.code).to.equal(401)

    expect(output.body).to.be.an('object')
    expect(output.body).to.have.property('messages').with.length(1)

    expect(output.body.messages)
      .to.include('Invalid Authorization header.')
  })

  it('should reject non-bearer headers', () => {

    var authHeader = 'blah blah blah'
    var validationResult = validate(authHeader)

    var output = validate(authHeader)

    expect(output.code).to.equal(401)

    expect(output.body).to.be.an('object')
    expect(output.body).to.have.property('messages').with.length(1)

    expect(output.body.messages)
      .to.include('Invalid Authorization header.')
  })
})
