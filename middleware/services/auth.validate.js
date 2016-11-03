const _ = require('lodash')


function validateHeader (authHeader) {

  var result = null

  var validators =
    [ { message: 'Invalid Authorization header.'
      , test: _.includes(authHeader, 'Bearer ')
      }
    ]

  var failures = _.reject(validators, 'test')

  if (failures.length) {

    result =
      { code: 401 // Unauthorized
      , body:
        { messages: _.map(failures, failure => failure.message)
        }
      }
  }

  return result
}

module.exports = validateHeader
