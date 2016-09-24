function respondWithErrors (errors, request, response) {

  var codeForResult
  var jsonForResult

  // If we're in this responder, but there aren't errors, something is fishy!
  // Todo: should this return a specific message?
  if (errors.length === 0) {
    codeForResult = 500 // Internal server error
  }
  else {
    codeForResult = 400 // Bad request
  }

  return response
    .status(codeForResult)
    .json(
      { errors: errors
      , params: request.params
      , path: request.path
      }
    )
}

module.exports = respondWithErrors
