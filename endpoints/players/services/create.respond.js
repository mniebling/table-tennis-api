function respond (dbResult, request, response) {

  var codeForResult = 200
  var jsonForResult =
    { message: 'Player created.'
    , generatedId: dbResult['generated_keys'][0]
    }

  return response
    .status(codeForResult)
    .json(jsonForResult)
}

module.exports = respond
