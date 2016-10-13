const _ = require('lodash')


function idDidNotChange (request) {
  if (request.body.id) {
    return (request.body.id === request.params.id)
  }
  return true
}


function validateRequest (request) {

  var result = null

  var validators =
    [ { message: 'Request parameter `fullName` cannot be empty.'
      , test: !_.isEmpty(request.body.fullName)
      }
    , { message: 'Request parameter `nickname` cannot be empty.'
      , test: !_.isEmpty(request.body.nickname)
      }
    , { message: 'Request parameter `id` cannot be changed.'
      , test: idDidNotChange(request)
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
