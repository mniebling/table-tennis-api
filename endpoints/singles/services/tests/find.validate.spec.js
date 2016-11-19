const _ = require('lodash')
const expect = require('chai').expect
const validate = require('../find.validate')


describe('matches/find.validate', () => {

  it('should return null if no failures', () => {

    var request = {}
    _.set(request, 'params.id', 'abacb19d-0ee5-48e6-9cd4-298436018f52')

    var validationResult = validate(request)

    expect(validationResult).to.be.null
  })

  it('should reject bad guids', () => {

    var request = {}
    _.set(request, 'params.id', 'foo')

    var output = validate(request)

    expect(output.code).to.equal(400)

    expect(output.body).to.be.an('object')
    expect(output.body).to.have.property('messages').with.length(1)

    expect(output.body.messages)
      .to.include('Request parameter `id` must be a guid.')
  })
})
