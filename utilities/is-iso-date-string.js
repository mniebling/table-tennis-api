const moment = require('moment')


function isIsoDateString (dateString) {
  return moment(dateString, moment.ISO_8601).isValid()
}

module.exports = isIsoDateString
