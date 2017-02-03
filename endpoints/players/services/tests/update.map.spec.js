const _ = require('lodash')
const expect = require('chai').expect
const map = require('../update.map')


describe('players/update.map.request', () => {

  it('should map valid properties', () => {

    var request = {}
    _.set(request, 'params.id', '1')
    _.set(request, 'body.fullName', 'John Doe')
    _.set(request, 'body.nickname', 'Johnny')
    _.set(request, 'body.avatarUrl', 'https://www.foo.com/bar.jpg')

    var output = map.request(request)

    expect(output).to.be.an('object')
    expect(output).to.have.property('id', '1')
    expect(output).to.have.property('fullName', 'John Doe')
    expect(output).to.have.property('nickname', 'Johnny')
    expect(output).to.have.property('avatarUrl', 'https://www.foo.com/bar.jpg')
  })

  it('should not map missing properties', () => {

    var request = {}
    _.set(request, 'params.id', '1')
    _.set(request, 'body.nickname', 'Johnny')

    var output = map.request(request)

    expect(output).to.be.an('object')
    expect(output).not.to.have.property('avatarUrl')
    expect(output).not.to.have.property('fullName')
    expect(output).not.to.have.property('phoneticNickname')
  })
})


describe('players/update.map.result', () => {

  it('should always return 200', () => {

    var dbResult = { changes: [] }
    var code = map.result(dbResult).code

    expect(code).to.equal(200)
  })

  it('should return a message if the changes array is empty', () => {

    var dbResult = { changes: [] }
    var body = map.result(dbResult).body

    expect(body).to.equal('Player not found.')
  })

  it('should return changes if there are any', () => {

    var dbResult = {}
    _.set(dbResult, 'changes', [{ foo: 'bar' }])
    var body = map.result(dbResult).body

    expect(body).to.equal(dbResult.changes)
  })
})
