var mapper = {}

mapper.request = function (request) {

  var player =
    { fullName: request.body.fullName
    , nickname: request.body.nickname
    , avatarUrl: request.body.avatarUrl
    }

  // Update will have an `id`, create won't.
  if (request.params.id) {
    player.id = request.params.id
  }

  return player
}

mapper.result = function (dbResult) {

  // Todo: how to test that I didn't forget to pass { returnChanges: true } in
  // the update command? Otherwise the changes property does not exist.
  return (
    { code: 200
    , body: dbResult.changes
    })
}

module.exports = mapper
