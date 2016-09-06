//
// POST '/v1/players'
//
// Creates a new player with the json posted in body.
const rethink = require('rethinkdb')


function createPlayer (request, response) {

  // Map
  var player =
    { firstName: request.body.firstName
    , lastName: request.body.lastName
    , avatarUrl: request.body.avatarUrl
    }

  // Validate
  if (!player.firstName || !player.lastName) {
    response
      .status(404)
      .json(
        { message: 'You must provide firstName and lastName.'
        , params: request.params
        , path: request.path
        }
      )

    return
  }

  // Create
  rethink
    .db('tabletennis')
    .table('players')
    .insert(player)
    .run(request._connection)
    .then(console.log)
    .catch(console.error)
    .finally(() => {
      request._connection.close() // Todo: close connection in middleware
      response.json(player)
    })
}

module.exports = createPlayer
