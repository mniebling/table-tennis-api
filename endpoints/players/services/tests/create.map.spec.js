const _ = require('lodash')
const expect = require('chai').expect
const map = require('../create.map')


describe('players/create.map.request', () => {

  it('should map valid properties', () => {

    var request = {}
    _.set(request, 'body.fullName', 'John Doe')
    _.set(request, 'body.nickname', 'Johnny')
    _.set(request, 'body.phoneticNickname', 'John Dough')
    _.set(request, 'body.avatarUrl', 'https://www.foo.com/bar.jpg')

    var output = map.request(request)

    expect(output).to.be.an('object')
    expect(output).to.have.property('fullName', 'John Doe')
    expect(output).to.have.property('nickname', 'Johnny')
    expect(output).to.have.property('phoneticNickname', 'John Dough')
    expect(output).to.have.property('avatarUrl', 'https://www.foo.com/bar.jpg')
  })

  it('should map missing optional properties', () => {

    var request = {}
    _.set(request, 'body.fullName', 'John Doe')
    _.set(request, 'body.nickname', 'Johnny')

    var output = map.request(request)

    expect(output).to.be.an('object')
    expect(output).to.have.property('fullName', 'John Doe')
    expect(output).to.have.property('nickname', 'Johnny')
    expect(output).to.have.property('phoneticNickname', '')
    expect(output).to.have.property('avatarUrl', '')
  })
})


describe('players/create.map.result', () => {

  var dbResult = { changes: [ {} ] }
  _.set(dbResult.changes[0], 'new_val.id', '1')
  _.set(dbResult.changes[0], 'new_val.fullName', 'John Doe')

  it('should always return 201', () => {

    var code = map.result(dbResult).code

    expect(code).to.equal(201)
  })

  it('should return the created player', () => {

    var body = map.result(dbResult).body

    expect(body).to.equal(dbResult.changes[0]['new_val'])
  })
})
