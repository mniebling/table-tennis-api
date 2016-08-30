//
// GET '/v1/players'
//
// Returns a list of players.

var players = require('./data.js')


function listPlayers (request, response) {

  response.json(players)
}

module.exports = listPlayers
