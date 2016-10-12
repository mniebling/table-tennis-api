// POST '/v1/players/:id'
const rethink = require('rethinkdb')
const validate = require('./services/update.validate')
const map = require('./services/update.map')


// Todo: Should we require an update to provide _all_ fields on the player,
// or just the ones the client wishes to update? For now, we'll require all
// the required fields just like `create` does.
function updatePlayer (request, response) {

  var validationResult = validate(request, player)

  if (validationResult) {
    return response
      .status(validationResult.code)
      .json(validationResult.body)
  }


  var player = map.request(request)


  rethink
    .db('tabletennis')
    .table('players')
    .get(player.id)
    .update(player, { returnChanges: true })
    .run(request._dbConnection)
    .then(dbResult => {

      var output = map.result(dbResult)

      return response
        .status(output.code)
        .json(output.body)
    })
    .catch(console.error)
}

module.exports = updatePlayer
