function respond (dbResult, request, response) {

  var codeForResult
  var jsonForResult

  if (!dbResult) {
    codeForResult = 404 // Not found
    jsonForResult =
      { message: 'No player matches that id.'
      , params: request.params
      , path: request.path
      }
  }
  else {
    codeForResult = 200
    jsonForResult = dbResult
  }

  return response
    .status(codeForResult)
    .json(jsonForResult)
}

module.exports = respond
