function respond (dbResult, request, response) {

  var codeForResult = 200
  var jsonForResult = dbResult

  return response
    .status(codeForResult)
    .json(jsonForResult)
}

module.exports = respond
