const _ = require('lodash')


// Very naive guid checker
function isGuid (param) {
  return (param.length === 36)
}


function validateRequest (request) {

  var validators =
    [ { message: 'Request parameter `id` must be a guid.'
      , test: isGuid(request.params.id)
      }
    ]

  var failures = _.reject(validators, 'test')

  return _.map(failures, 'message')
}

module.exports = validateRequest
