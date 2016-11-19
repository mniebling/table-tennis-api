const _ = require('lodash')
const expect = require('chai').expect
const map = require('../create.map')


describe('singles/create.map.request', () => {

  it('should map valid properties', () => {

    var request = {}
    _.set(request, 'body.firstServer', '0c891205-d932-44ce-a2aa-4071797572ff')
    _.set(request, 'body.winner', '0c891205-d932-44ce-a2aa-4071797572ff')
    _.set(request, 'body.loser', 'e616c3bf-962c-467d-8ae1-62d5d11d1431')
    _.set(request, 'body.games', '[{}, {}, {}, {}, {}]')
    _.set(request, 'body.startTime', '2016-11-17T02:01:21Z')
    _.set(request, 'body.endTime', '2016-11-17T02:10:21Z')

    var output = map.request(request)

    expect(output).to.be.an('object')
    expect(output).to.have.property('firstServer', '0c891205-d932-44ce-a2aa-4071797572ff')
    expect(output).to.have.property('winner', '0c891205-d932-44ce-a2aa-4071797572ff')
    expect(output).to.have.property('loser', 'e616c3bf-962c-467d-8ae1-62d5d11d1431')
    expect(output).to.have.property('games', '[{}, {}, {}, {}, {}]')
    expect(output).to.have.property('startTime', '2016-11-17T02:01:21Z')
    expect(output).to.have.property('endTime', '2016-11-17T02:10:21Z')
  })
})


describe('singles/create.map.result', () => {

  var dbResult = { changes: [ {} ] }
  _.set(dbResult.changes[0], 'new_val.id', '1')
  _.set(dbResult.changes[0], 'new_val.firstServer', '0c891205-d932-44ce-a2aa-4071797572ff')

  it('should always return 201', () => {

    var code = map.result(dbResult).code

    expect(code).to.equal(201)
  })

  it('should return the created match', () => {

    var body = map.result(dbResult).body

    expect(body).to.equal(dbResult.changes[0]['new_val'])
  })
})
