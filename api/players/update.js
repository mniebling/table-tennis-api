//
// POST '/v1/players/:id'
//
// Updates the player with the specified id.

const _ = require('lodash')
var players = require('./data.js')


function updatePlayer (request, response) {

  var player = _.find(players, { 'id': request.params.id })

  if (!player) {
    response
      .status(404)
      .json(
        { message: 'No player matches that id.'
        , params: request.params
        , path: request.path
        }
      )
  }

  if (!_.isString(request.body.name)) {
    response
      .status(400)
      .json(
        { message: 'You must provide a String for the `name` property.'
        , params: request.params
        , path: request.path
        }
      )
  }

  player.name = request.body.name

  response.json(player)
}

module.exports = updatePlayer
