const _ = require('lodash')


function validateRequest (request) {

  var result = null

  var validators =
    [ { message: 'Request parameter `fullName` cannot be empty.'
      , test: !_.isEmpty(request.body.fullName)
      }
    , { message: 'Request parameter `nickname` cannot be empty.'
      , test: !_.isEmpty(request.body.nickname)
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
