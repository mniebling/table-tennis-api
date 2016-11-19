// GET '/v1/singles/:id'
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
    .then(dbResult => {

      var output = map.result(dbResult)

      return response
        .status(output.code)
        .json(output.body)
    })
    .catch(console.error)
}

module.exports = getSinglesMatch
