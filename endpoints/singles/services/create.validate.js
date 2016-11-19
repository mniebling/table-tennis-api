const _ = require('lodash')
const isGuid = require('../../../utilities/is-guid')
const isIsoDateString = require('../../../utilities/is-iso-date-string')


function isValidGames (games) {
  return (_.isArray(games) && games.length === 5)
}


function validateRequest (request) {

  var result = null

  var validators =
    [ { message: 'Request parameter `firstServer` must be a valid guid.'
      , test: isGuid(request.body.firstServer)
      }
    , { message: 'Request parameter `winner` must be a valid guid.'
      , test: isGuid(request.body.winner)
      }
    , { message: 'Request parameter `loser` must be a valid guid.'
      , test: isGuid(request.body.loser)
      }
    , { message: 'Request parameter `games` must be an array of 5 games.'
      , test: isValidGames(request.body.games)
      }
    , { message: 'Request parameter `startTime` must be an ISO-8601 datetime string.'
      , test: isIsoDateString(request.body.startTime)
      }
    , { message: 'Request parameter `endTime` must be an ISO-8601 datetime string.'
      , test: isIsoDateString(request.body.endTime)
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
