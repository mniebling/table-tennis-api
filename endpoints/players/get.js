// GET '/v1/players/:id'
const rethink = require('rethinkdb')

const validate = require('./services/get.validate')
const respond = require('./services/get.respond')


function getPlayer (request, response) {

  var requestErrors = validate(request)

  // Todo: a utility which takes an array of errors and builds/executes
  // this response. I think for now it is fine that all validation failures
  // would result in a 400. The signature could look like:
  // if (requestErrors) { return respondWithErrors(requestErrors) }
  if (requestErrors.length) {
    response
      .status(400) // Bad request
      .json(
        { errors: requestErrors
        , params: request.params
        , path: request.path
        }
      )
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
