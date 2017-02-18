const _ = require('lodash')


function validateContentType (contentTypeHeader) {

  var result = null

  var validators =
    [ { message: 'Content-Type must be application/json.'
      , test: _.includes(contentTypeHeader, 'application/json')
      }
    ]

  var failures = _.reject(validators, 'test')

  if (failures.length) {

    result =
      { code: 400 // Bad request
      , body:
        { messages: _.map(failures, failure => failure.message)
        }
      }
  }

  return result
}

module.exports = validateContentType
