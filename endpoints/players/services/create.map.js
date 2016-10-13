var mapper = {}

mapper.request = function (request) {

  var player =
    { fullName: request.body.fullName
    , nickname: request.body.nickname
    , phoneticNickname: request.body.phoneticNickname || ''
    , avatarUrl: request.body.avatarUrl || ''
    }

  return player
}

mapper.result = function (dbResult) {

  // Todo: how to test that I didn't forget to pass { returnChanges: true } in
  // the update command? Otherwise the changes property does not exist.
  return (
    { code: 201 // Created
    , body: dbResult.changes[0]['new_val']
    })
}

module.exports = mapper
