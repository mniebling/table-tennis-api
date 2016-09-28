// GET '/v1/players'
const rethink = require('rethinkdb')
const respond = require('./services/list.respond')


function listPlayers (request, response) {

  rethink
    .db('tabletennis')
    .table('players')
    .run(request._dbConnection)
    .then(cursor => {
      cursor
        .toArray()
        .then(result => respond(result, request, response))
    })
    .catch(console.error) // Todo: return a 500 if something internal breaks
}

module.exports = listPlayers
