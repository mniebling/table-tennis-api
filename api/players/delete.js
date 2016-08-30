//
// DELETE '/v1/players/:id'
//
// Deletes the player with the specified id.

const _ = require('lodash')
var players = require('./data.js')


function deletePlayer (request, response) {

  var player = _.find(players, { 'id': request.params.id })

  if (!player) {
    reponse
      .status(404)
      .json(
        { message: 'No player matches that id.'
        , params: request.params
        , path: request.path
        }
      )
  }

  _.remove(players, _.matchesProperty('id', request.params.id))

  // to do: just send status? or send message object?
  response.status(200).send('Deleted.')
}

module.exports = deletePlayer
