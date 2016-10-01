// Validation for methods that find a player.
// --------------------------------------------------
const _ = require('lodash')


// Very naive guid checker
function isGuid (param) {
  return (param.length === 36)
}


function validateRequest (request) {

  var result = null

  var validators =
    [ { message: 'Request parameter `id` must be a guid.'
      , test: isGuid(request.params.id)
      }
    ]

  var failures = _.reject(validators, 'test')

  if (failures.length) {

    result =
      { code: 400 // Bad request
      , body:
        { messages: _.map(failures, failure => failure.message)
        , params: request.params
        , path: request.path
        }
      }
  }

  return result
}

module.exports = validateRequest
