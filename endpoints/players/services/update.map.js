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

  var body;

  if (dbResult.changes.length === 0) {
    body = 'Player not found.'
  }
  else {
    body = dbResult.changes
  }

  return (
    { code: 200
    , body: body
    })
}

module.exports = mapper
