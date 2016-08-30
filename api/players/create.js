//
// POST '/v1/players'
//
// Creates a new player with the json posted in body.

var players = require('./data.js')


function updatePlayer (request, response) {

  var player = request.body
  player.id = (players.length + 1).toString()
  players.push(player)

  response.json(player)
}

module.exports = updatePlayer
