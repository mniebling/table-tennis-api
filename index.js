const bodyParser = require('body-parser')
const express = require('express')
const rethink = require('rethinkdb')


// Create the Express instance
var app = express()

// Initialize built-in middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Open a db connection and attach it to the request object
app.use(require('./middleware/create-connection'))

// Close the db connection that is attached to the request
// (this adds an event listener to the request `end` event to do so)
app.use(require('./middleware/close-connection'))

// Start listening
app.listen(8888, () => {
  console.log('express definitely running at 8888')
})

// Routes
// Todo: When there are more resources, register the routes in the pods.
// https://nodejs.org/api/modules.html#modules_folders_as_modules
app.get('/v1',
  require('./endpoints/list-endpoints'))


app.get('/v1/players',
  require('./endpoints/players/list'))

app.get('/v1/players/:id',
  require('./endpoints/players/get'))

app.post('/v1/players',
  require('./endpoints/players/create'))

app.post('/v1/players/:id',
  require('./endpoints/players/update'))

app.delete('/v1/players/:id',
  require('./endpoints/players/delete'))


app.get('/*', (request, response) => {
  // Todo: serve a static page?
  response.status(404).send('Not found.')
})
