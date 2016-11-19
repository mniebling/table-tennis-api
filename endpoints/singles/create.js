// POST '/v1/singles'
const rethink = require('rethinkdb')
const validate = require('./services/create.validate')
const map = require('./services/create.map')


function createSinglesMatch (request, response) {

  var validationResult = validate(request)

  if (validationResult) {
    return response
      .status(validationResult.code)
      .json(validationResult.body)
  }


  var match = map.request(request)


  rethink
    .db('tabletennis')
    .table('singles_matches')
    .insert(match, { returnChanges: true })
    .run(request._dbConnection)
    .then(dbResult => {

      var output = map.result(dbResult)

      return response
        .status(output.code)
        .json(output.body)
    })
    .catch(console.error)
}

module.exports = createSinglesMatch
