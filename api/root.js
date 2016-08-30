//
// GET '/v1'
//
// Returns a list of available endpoints.

function listEndpoints (request, response) {

  const endpoints =
    [ { 'GET /v1': 'get list of endpoints' }
    , { 'GET /v1/players': 'get list of players' }
    , { 'GET /v1/players/[id]': 'get player with specified id' }
    , { 'POST /v1/players/': 'create new player' }
    , { 'POST /v1/players/[id]': 'update player with specified id' }
    , { 'DELETE /v1/players/[id]': 'delete player with specified id' }
    ]

  response.json(endpoints)
}

module.exports = listEndpoints
