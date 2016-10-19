var mapper = {}

mapper.request = function (request) {

  var player = { id: request.params.id }

  // Todo: think of a more concise/declarative way to do this
  if (request.body.fullName) {
    player.fullName = request.body.fullName
  }

  if (request.body.nickname) {
    player.nickname = request.body.nickname
  }

  if (request.body.phoneticNickname) {
    player.phoneticNickname = request.body.phoneticNickname
  }

  if (request.body.avatarUrl) {
    player.avatarUrl = request.body.avatarUrl
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
