const bodyParser = require('body-parser')
const express = require('express')
const rethink = require('rethinkdb')


// Create the Express instance
var app = express()

// Initialize built-in middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Ensure that requests have the application/json content-type.
app.use(require('./middleware/check-content-type'))

// Open a db connection and attach it to the request object
app.use(require('./middleware/create-connection'))

// Close the db connection that is attached to the request
// (this adds an event listener to the request `end` event to do so)
app.use(require('./middleware/close-connection'))

// Authenticate the request for a valid api key
app.use(require('./middleware/authenticate'))

// Start listening
var port = process.env.PORT || 8888

app.listen(port, () => {
  console.log(`express definitely running at ${port}`)
})

// Routes
// Todo: When there are more resources, register the routes in the pods.
// https://nodejs.org/api/modules.html#modules_folders_as_modules

// Players
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

// Singles matches
app.get('/v1/singles',
  require('./endpoints/singles/list'))

app.get('/v1/singles/:id',
  require('./endpoints/singles/get'))

app.post('/v1/singles',
  require('./endpoints/singles/create'))

app.delete('/v1/singles/:id',
  require('./endpoints/singles/delete'))


app.get('/*', (request, response) => {
  // Todo: serve a static page?
  response.status(404).send('Not found.')
})
