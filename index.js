const express = require('express')
const bodyParser = require('body-parser')


// Create the Express instance
var host = express()

// Initialize middleware
host.use(bodyParser.urlencoded({ extended: true }))
host.use(bodyParser.json())

// Start listening
host.listen(8888, () => {
  console.log('express definitely running at 8888')
})

// Routes
// To do: When there are more resources, register the routes in the pods.
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
  // To do: serve a static page?
  response.status(404).send('Not found.')
})
