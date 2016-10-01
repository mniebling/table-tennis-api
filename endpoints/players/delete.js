// DELETE '/v1/players/:id'
const rethink = require('rethinkdb')
const validate = require('./services/find.validate')
const map = require('./services/delete.map')


function deletePlayer (request, response) {

  var validationResult = validate(request)

  if (validationResult) {
    return response
      .status(validationResult.code)
      .json(validationResult.body)
  }


  rethink
    .db('tabletennis')
    .table('players')
    .get(request.params.id)
    .delete()
    .run(request._dbConnection)
    .then(dbResult => {

      var output = map.result(dbResult)

      return response
        .status(output.code)
        .json(output.body)
    })
    .catch(console.error)
}

module.exports = deletePlayer
