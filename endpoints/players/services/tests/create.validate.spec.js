const _ = require('lodash')
const expect = require('chai').expect
const validate = require('../create.validate')


describe('players/create.validate', () => {

  it('should return null if no failures', () => {

    var request = {}
    _.set(request, 'body.fullName', 'John Doe')
    _.set(request, 'body.nickname', 'Johnny')

    var validationResult = validate(request)

    expect(validationResult).to.be.null
  })

  it('should reject empty `fullName` field', () => {

    var request = {}
    _.set(request, 'body.nickname', 'Johnny')

    var output = validate(request)

    expect(output.code).to.equal(400)

    expect(output.body).to.be.an('object')
    expect(output.body).to.have.property('messages').with.length(1)

    expect(output.body.messages)
      .to.include('Request parameter `fullName` cannot be empty.')
  })

  it('should reject empty `nickname` field', () => {

    var request = {}
    _.set(request, 'body.fullName', 'John Doe')

    var output = validate(request)

    expect(output.code).to.equal(400)

    expect(output.body).to.be.an('object')
    expect(output.body).to.have.property('messages').with.length(1)

    expect(output.body.messages)
      .to.include('Request parameter `nickname` cannot be empty.')
  })
})
