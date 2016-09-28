function mapRequestToPlayer (request) {

  var player =
    { firstName: request.body.firstName
    , lastName: request.body.lastName
    , avatarUrl: request.body.avatarUrl
    }

  return player
}

module.exports = mapRequestToPlayer
