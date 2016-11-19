var mapper = {}

mapper.request = function (request) {

  var singlesMatch =
    { firstServer: request.body.firstServer
    , winner: request.body.winner
    , loser: request.body.loser
    , games: request.body.games
    , startTime: request.body.startTime
    , endTime: request.body.endTime
    }

  return singlesMatch
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
