const _ = require('lodash')


function validateRequest (request) {

  var validators =
    [ { message: '`firstName` and `lastName` must be provided.'
      , test: (request.body.firstName !== '') && (request.body.lastName !== '')
      }
    ]

  var failures = _.reject(validators, 'test')

  return _.map(failures, 'message')
}

module.exports = validateRequest
