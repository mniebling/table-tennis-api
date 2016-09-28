// POST '/v1/players'
const rethink = require('rethinkdb')
const respondToBadRequest = require('../../utilities/respond-to-bad-request')
const validate = require('./services/create.validate')
const mapRequestToPlayer = require('./services/create.map')
const respond = require('./services/create.respond')


function createPlayer (request, response) {

  var requestErrors = validate(request)

  if (requestErrors.length) {
    return respondToBadRequest(requestErrors, request, response)
  }

  var player = mapRequestToPlayer(request)

  rethink
    .db('tabletennis')
    .table('players')
    .insert(player)
    .run(request._dbConnection)
    .then(result => respond(result, request, response))
    .catch(console.error)
}

module.exports = createPlayer
