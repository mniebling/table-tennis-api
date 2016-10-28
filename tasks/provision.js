// Run this script to set up the database for the first time.
const _ = require('lodash')
const rethink = require('rethinkdb')


// Initialize database connection
// Todo: refactor database configuration into a separate module.
var params =
  { host: process.env.DB_IP || 'localhost'
  , port: 28015
  , user: process.env.DB_USERNAME || 'admin'
  , password: process.env.DB_PASSWORD || ''
  }

// Control flow
rethink
  .connect(params)
  .bind({})
  .then(bindConnection)
  .then(createDatabase)

  // If we just call the functions with the table names we want, as arguments
  // to `then`, the chain becomes asynchronous. Instead, we use partial
  // application to create some functions with hard-coded arguments. These
  // functions will get called in synchronous order.
  .then(_.partial(createTable, 'players'))
  .then(_.partial(createTable, 'api_keys'))

  .then(closeConnection)
  .catch(console.error)
  .finally(process.exit)

// As the first step in the series of promises, attach the open connection to
// the chain's `this` scope, which is created by `bind({})`.
function bindConnection (connection) {
  this.connection = connection
  return
}

// Close the DB connection that we have been passing through the chain's scope.
function closeConnection () {
  this.connection.close()
  return
}

// Create the `tabletennis` database if it does not already exist.
function createDatabase () {

  return rethink
    .dbList()
    .contains('tabletennis')
    .run(this.connection)
    .then(dbExists => {

      if (dbExists) {
        console.log('The "tabletennis" database already exists.')
        return
      }

      else {
        return rethink
          .dbCreate('tabletennis')
          .run(this.connection)
          .then(console.log) // Todo: wrap JSON.stringify
      }
    })
}

// Create the necessary tables if they do not already exist.
function createTable (tableName) {

  return rethink
    .db('tabletennis')
    .tableList()
    .contains(tableName)
    .run(this.connection)
    .then(tableExists => {

      if (tableExists) {
        console.log(`The "${tableName}" table already exists.`)
        return
      }

      else {
        return rethink
          .db('tabletennis')
          .tableCreate(tableName)
          .run(this.connection)
          .then(console.log) // Todo: wrap JSON.stringify
      }
    })
}
