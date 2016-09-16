//
// GET '/v1/players/:id'
//
// Gets the player with the specified id.

const rethink = require('rethinkdb')


function getPlayer (request, response) {

  rethink
    .db('tabletennis')
    .table('players')
    .get(request.params.id)
    .run(request._dbConnection)
    .then(result => {

      console.log(`GET player id ${request.params.id} : ${result}`)

      if (!result) {
        response
          .status(404)
          .json(
            { message: 'No player matches that id.'
            , params: request.params
            , path: request.path
            }
          )

        return
      }

      response.json(result)
    })
    .catch(console.error)
}

module.exports = getPlayer
