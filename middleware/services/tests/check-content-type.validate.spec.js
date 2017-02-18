const _ = require('lodash')
const expect = require('chai').expect
const validate = require('../check-content-type.validate')


describe('middleware/check-content-type.validate', () => {

  it('should return null if no failures', () => {

    var contentTypeHeader = 'application/json'
    var validationResult = validate(contentTypeHeader)

    expect(validationResult).to.be.null
  })

  it('should reject missing content type', () => {

    var contentTypeHeader = null
    var validationResult = validate(contentTypeHeader)

    var output = validate(contentTypeHeader)

    expect(output.code).to.equal(400)

    expect(output.body).to.be.an('object')
    expect(output.body).to.have.property('messages').with.length(1)

    expect(output.body.messages)
      .to.include('Content-Type must be application/json.')
  })

  it('should reject content types other than application/json', () => {

    var contentTypeHeader = 'text/html'
    var validationResult = validate(contentTypeHeader)

    var output = validate(contentTypeHeader)

    expect(output.code).to.equal(400)

    expect(output.body).to.be.an('object')
    expect(output.body).to.have.property('messages').with.length(1)

    expect(output.body.messages)
      .to.include('Content-Type must be application/json.')
  })
})
