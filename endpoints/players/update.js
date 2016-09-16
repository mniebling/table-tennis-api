//
// POST '/v1/players/:id'
//
// Updates the player with the specified id.

const rethink = require('rethinkdb')


function updatePlayer (request, response) {

  // Map
  //
  // Todo: Should we require an update to provide _all_ fields on the player,
  // or just the ones the client wishes to update? For now, we'll require all
  // the required fields just like `update` does.
  var player =
    { firstName: request.body.firstName
    , lastName: request.body.lastName
    , avatarUrl: request.body.avatarUrl
    }

  // Validate
  if (!player.firstName || !player.lastName) {
    response
      .status(400)
      .json(
        { message: 'You must provide firstName and lastName.'
        , params: request.params
        , path: request.path
        }
      )

    return
  }

  // Update
  rethink
    .db('tabletennis')
    .table('players')
    .get(request.params.id)
    .update(player)
    .run(request._dbConnection)
    .then(result => {
      console.log(result)
      response.json(result) // Todo: should probably return a cleaner response
    })
    .catch(console.error) // Todo: return 500 if something breaks
}

module.exports = updatePlayer
