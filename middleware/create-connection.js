// This middleware wraps each request to provide a handle to the RethinkDB
// connection on the request object.
const rethink = require('rethinkdb')


function createConnection (request, response, next) {

  // Todo: refactor database config into a separate module
  var params =
    { host: process.env.DB_IP || 'localhost'
    , port: 28015
    }

  rethink
    .connect(params)
    .then(connection => {
      request._dbConnection = connection
      next()
    })
    // Todo: Create a concise error helper
    .catch(error => {
      response.status(500).send({ error: error.message })
    });
}

module.exports = createConnection
