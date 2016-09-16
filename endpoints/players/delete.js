//
// DELETE '/v1/players/:id'
//
// Deletes the player with the specified id.

const rethink = require('rethinkdb')


function deletePlayer (request, response) {

  rethink
    .db('tabletennis')
    .table('players')
    .get(request.params.id)
    .delete()
    .run(request._dbConnection)
    .then(result => {

      console.log(`DELETE player id ${request.params.id} : ${JSON.stringify(result)}`)

      if (result.deleted === 0) {
        response
          .status(404)
          .json(
            { message: 'No player matches that id.'
            , params: request.params
            , path: request.path
            }
          )
      }
      else {
        // Todo: just send status? or send message object?
        response.status(200).send(`Player deleted: ${request.params.id}`)
      }
    })
    .catch(console.error)
}

module.exports = deletePlayer
