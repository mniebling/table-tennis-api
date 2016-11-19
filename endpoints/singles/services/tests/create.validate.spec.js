const _ = require('lodash')
const expect = require('chai').expect
const validate = require('../create.validate')


function goodRequest () {
  return (
    { body:
      { winner: '0c891205-d932-44ce-a2aa-4071797572ff'
      , loser: 'e616c3bf-962c-467d-8ae1-62d5d11d1431'
      , firstServer: '0c891205-d932-44ce-a2aa-4071797572ff'
      , games: [{}, {}, {}, {}, {}]
      , startTime: '2016-11-17T02:01:21Z'
      , endTime: '2016-11-17T02:10:21Z'
      }
    })
}


describe('singles/create.validate', () => {

  it('should return null if no failures', () => {

    var validationResult = validate(goodRequest())

    expect(validationResult).to.be.null
  })

  it('should reject bad first server guids', () => {

    var request = goodRequest()
    _.set(request, 'body.firstServer', 'foo')

    var output = validate(request)

    expect(output.code).to.equal(400)

    expect(output.body).to.be.an('object')
    expect(output.body).to.have.property('messages').with.length(1)

    expect(output.body.messages)
      .to.include('Request parameter `firstServer` must be a valid guid.')
  })

  it('should reject bad winner guids', () => {

    var request = goodRequest()
    _.set(request, 'body.winner', 'foo')

    var output = validate(request)

    expect(output.code).to.equal(400)

    expect(output.body).to.be.an('object')
    expect(output.body).to.have.property('messages').with.length(1)

    expect(output.body.messages)
      .to.include('Request parameter `winner` must be a valid guid.')
  })

  it('should reject bad loser guids', () => {

    var request = goodRequest()
    _.set(request, 'body.loser', 'foo')

    var output = validate(request)

    expect(output.code).to.equal(400)

    expect(output.body).to.be.an('object')
    expect(output.body).to.have.property('messages').with.length(1)

    expect(output.body.messages)
      .to.include('Request parameter `loser` must be a valid guid.')
  })

  it('should reject malformed games arrays', () => {

    var request = goodRequest()
    _.set(request, 'body.games', []) // Empty

    var output = validate(request)

    expect(output.code).to.equal(400)

    expect(output.body).to.be.an('object')
    expect(output.body).to.have.property('messages').with.length(1)

    expect(output.body.messages)
      .to.include('Request parameter `games` must be an array of 5 games.')


    _.set(request, 'body.games', [{}, {}, {}]) // Only 3 games

    output = validate(request)

    expect(output.code).to.equal(400)

    expect(output.body).to.be.an('object')
    expect(output.body).to.have.property('messages').with.length(1)

    expect(output.body.messages)
      .to.include('Request parameter `games` must be an array of 5 games.')
  })

  it('should reject bad startTime strings', () => {

    var request = goodRequest()
    _.set(request, 'body.startTime', 'Thu, 17 Nov 2016 03:47:35 GMT') // UTC is no good

    var output = validate(request)

    expect(output.code).to.equal(400)

    expect(output.body).to.be.an('object')
    expect(output.body).to.have.property('messages').with.length(1)

    expect(output.body.messages)
      .to.include('Request parameter `startTime` must be an ISO-8601 datetime string.')
  })

  it('should reject bad endTime strings', () => {

    var request = goodRequest()
    _.set(request, 'body.endTime', 'Thu, 17 Nov 2016 03:47:35 GMT') // UTC is no good

    var output = validate(request)

    expect(output.code).to.equal(400)

    expect(output.body).to.be.an('object')
    expect(output.body).to.have.property('messages').with.length(1)

    expect(output.body.messages)
      .to.include('Request parameter `endTime` must be an ISO-8601 datetime string.')
  })
})
