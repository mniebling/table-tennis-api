// GET '/v1/players/:id'
const rethink = require('rethinkdb')
const respondToBadRequest = require('../../utilities/respond-to-bad-request')
const validate = require('./services/get.validate')
const respond = require('./services/get.respond')


function getPlayer (request, response) {

  var requestErrors = validate(request)

  if (requestErrors.length) {
    return respondToBadRequest(requestErrors, request, response)
  }

  rethink
    .db('tabletennis')
    .table('players')
    .get(request.params.id)
    .run(request._dbConnection)
    .then(result => respond(result, request, response))
    .catch(console.error)
}

module.exports = getPlayer
