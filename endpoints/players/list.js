// GET '/v1/players'
const rethink = require('rethinkdb')
const map = require('./services/list.map')


function listPlayers (request, response) {

  rethink
    .db('tabletennis')
    .table('players')
    .run(request._dbConnection)
    .then(cursor => {
      cursor
        .toArray()
        .then(dbResult => {

          var output = map.result(dbResult)

          return response
            .status(output.code)
            .json(output.body)
        })
    })
    .catch(console.error) // Todo: return a 500 if something internal breaks
}

module.exports = listPlayers
