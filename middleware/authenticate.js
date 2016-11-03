// This middleware wraps each request to ensure the request has a proper and
// valid authentication header in place.
const _ = require('lodash')
const rethink = require('rethinkdb')
const validate = require('./services/auth.validate')


function authenticate (request, response, next) {

  var authHeader = request.get('Authorization')
  var validationResult = validate(authHeader)

  if (validationResult) {
    return response
      .status(validationResult.code)
      .json(validationResult.body)
  }

  // If we made it this far, we have the right header and the right format.
  // The value looks like: "Bearer {guid}".
  var apiKey = authHeader.split(' ')[1]

  rethink
    .db('tabletennis')
    .table('api_keys')
    .get(apiKey)
    .run(request._dbConnection)
    .then(dbResult => {

      // If it's null, there was no corresponding db entry for that token.
      if (dbResult === null) {
        return response
          .status(401) // Unauthorized
          .json({ message: 'Invalid API key.' })
      }

      // Otherwise, the token is present and valid.
      next()
    })
    .catch(console.error)
}

module.exports = authenticate
