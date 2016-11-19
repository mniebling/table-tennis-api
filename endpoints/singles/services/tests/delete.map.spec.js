const _ = require('lodash')
const expect = require('chai').expect
const map = require('../delete.map')


describe('singles/delete.map.result', () => {

  var dbResult = {}


  it('should return 200 if the match existed', () => {

  _.set(dbResult, 'deleted', 1)

    var code = map.result(dbResult).code

    expect(code).to.equal(200)
  })

  it('should return 404 if the match did not exist', () => {

    _.set(dbResult, 'deleted', 0)

    var code = map.result(dbResult).code

    expect(code).to.equal(404)
  })
})
