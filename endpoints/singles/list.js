// GET '/v1/singles'
const rethink = require('rethinkdb')
const map = require('./services/list.map')


function listSinglesMatches (request, response) {

  rethink
    .db('tabletennis')
    .table('singles_matches')
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

module.exports = listSinglesMatches
