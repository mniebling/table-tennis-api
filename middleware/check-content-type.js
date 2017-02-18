// This middleware wraps each request to make sure it has a content-type of
// application/json.
const _ = require('lodash')
const rethink = require('rethinkdb')
const validate = require('./services/check-content-type.validate')


function checkContentType (request, response, next) {

  var contentType = request.get('Content-Type')
  var validationResult = validate(contentType)

  if (validationResult) {
    return response
      .status(validationResult.code)
      .json(validationResult.body)
  }

  // Otherwise, we have the correct content type.
  next()
}

module.exports = checkContentType
