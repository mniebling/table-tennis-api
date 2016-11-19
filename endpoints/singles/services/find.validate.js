// Validation for methods that find a singles match.
// --------------------------------------------------
const _ = require('lodash')
const isGuid = require('../../../utilities/is-guid')


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
