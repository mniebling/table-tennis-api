// This middleware wraps each request to provide a handle to the RethinkDB
// connection on the request object.
const rethink = require('rethinkdb')


function closeConnection (request, response, next) {

  request._dbConnection.close()
  next()
}

module.exports = closeConnection
