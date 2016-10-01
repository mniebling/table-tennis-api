const expect = require('chai').expect
const map = require('../list.map')


describe('players/list.map.result', () => {

  var dbResult = []

  it('should always return 200', () => {

    var code = map.result(dbResult).code

    expect(code).to.equal(200)
  })

  it('should always return a list', () => {

    var body = map.result(dbResult).body

    expect(body).to.equal(dbResult)
  })
})
