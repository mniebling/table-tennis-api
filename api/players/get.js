//
// GET '/v1/players/:id'
//
// Gets the player with the specified id.

const _ = require('lodash')
var players = require('./data.js')


function getPlayer (request, response) {

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

    return
  }

  response.json(player)
}

module.exports = getPlayer
