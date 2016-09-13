//
// GET '/v1/players'
//
// Returns a list of players.

const rethink = require('rethinkdb')


function listPlayers (request, response) {

  rethink
    .db('tabletennis')
    .table('players')
    .run(request._dbConnection)
    .then(cursor => {

      console.log('GET players.')

      cursor
        .toArray()
        .then(results => {
          response.json(results) // Todo: paginate response
        })
    })
    .catch(console.error) // Todo: return a 500 if something internal breaks
    .finally(() => {
      request._dbConnection.close() // Todo: close connection in middleware
    })
}

module.exports = listPlayers
