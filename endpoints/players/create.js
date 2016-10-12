// POST '/v1/players'
const rethink = require('rethinkdb')
const validate = require('./services/create.validate')
const map = require('./services/create.map')


function createPlayer (request, response) {

  var validationResult = validate(request)

  if (validationResult) {
    return response
      .status(validationResult.code)
      .json(validationResult.body)
  }


  var player = map.request(request)


  rethink
    .db('tabletennis')
    .table('players')
    .insert(player, { returnChanges: true })
    .run(request._dbConnection)
    .then(dbResult => {

      var output = map.result(dbResult)

      return response
        .status(output.code)
        .json(output.body)
    })
    .catch(console.error)
}

module.exports = createPlayer
