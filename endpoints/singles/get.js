// GET '/v1/singles/:id'
const _ = require('lodash')
const rethink = require('rethinkdb')
const validate = require('./services/find.validate')
const map = require('./services/get.map')


function getSinglesMatch (request, response) {

  var validationResult = validate(request)

  if (validationResult) {
    return response
      .status(validationResult.code)
      .json(validationResult.body)
  }


  rethink
    .db('tabletennis')
    .table('singles_matches')
    .get(request.params.id)
    .run(request._dbConnection)
    .bind({})

    // Build the Match object
    .then(dbResult => {

      this.match = dbResult

      var findWinner = rethink
          .db('tabletennis')
          .table('players')
          .get(dbResult.winner)
          .run(request._dbConnection)
          .then(winnerResult => {
            this.match.winner = winnerResult
          })

      var findLoser = rethink
          .db('tabletennis')
          .table('players')
          .get(dbResult.loser)
          .run(request._dbConnection)
          .then(loserResult => {
            this.match.loser = loserResult
          })

      return Promise.all([ findWinner, findLoser ])
    })

    // Map the match object and respond to the request.
    .then(() => {

      var output = map.result(this.match)

      return response
        .status(output.code)
        .json(output.body)
    })

    .catch(console.error)
}

module.exports = getSinglesMatch
