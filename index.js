const bodyParser = require('body-parser')
const express = require('express')
const rethink = require('rethinkdb')


// Create the Express instance
var host = express()

// Initialize middleware
host.use(bodyParser.urlencoded({ extended: true }))
host.use(bodyParser.json())
host.use(createConnection)

// This middleware wraps each request to provide a handle to the RethinkDB
// connection on the request object.
function createConnection (request, response, next) {

  // Todo: refactor database config into a separate module
  var params =
    { host: 'localhost'
    , port: 28015
    }

  rethink
    .connect(params)
    .then(connection => {
      request._connection = connection;
      next();
    })
    // Todo: Create a concise error helper
    .catch(error => {
      response.status(500).send({ error: error.message })
    });
}

// Start listening
host.listen(8888, () => {
  console.log('express definitely running at 8888')
})

// Routes
// Todo: When there are more resources, register the routes in the pods.
// https://nodejs.org/api/modules.html#modules_folders_as_modules
host.get('/v1',
  require('./api/root.js'))


host.get('/v1/players',
  require('./api/players/list.js'))

host.get('/v1/players/:id',
  require('./api/players/get.js'))

host.post('/v1/players',
  require('./api/players/create.js'))

host.post('/v1/players/:id',
  require('./api/players/update.js'))

host.delete('/v1/players/:id',
  require('./api/players/delete.js'))


host.get('/*', (request, response) => {
  // Todo: serve a static page?
  response.status(404).send('Not found.')
})
