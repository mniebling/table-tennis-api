const bodyParser = require('body-parser')
const express = require('express')
const rethink = require('rethinkdb')


// Create the Express instance
var host = express()

// Initialize built-in middleware
host.use(bodyParser.urlencoded({ extended: true }))
host.use(bodyParser.json())

// Open a db connection and attach it to the request object
host.use(require('./middleware/create-connection'))

// Start listening
host.listen(8888, () => {
  console.log('express definitely running at 8888')
})

// Routes
// Todo: When there are more resources, register the routes in the pods.
// https://nodejs.org/api/modules.html#modules_folders_as_modules
host.get('/v1',
  require('./endpoints/list-endpoints'))


host.get('/v1/players',
  require('./endpoints/players/list'))

host.get('/v1/players/:id',
  require('./endpoints/players/get'))

host.post('/v1/players',
  require('./endpoints/players/create'))

host.post('/v1/players/:id',
  require('./endpoints/players/update'))

host.delete('/v1/players/:id',
  require('./endpoints/players/delete'))


host.get('/*', (request, response) => {
  // Todo: serve a static page?
  response.status(404).send('Not found.')
})


// Close the db connection that is attached to the request
host.use(require('./middleware/close-connection'))
