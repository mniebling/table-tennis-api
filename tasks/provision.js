// Run this script to set up the database for the first time.
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
  .then(createTables)
  .catch(console.error)
  .finally(process.exit)

// As the first step in the series of promises, attach the open connection to
// the chain's `this` scope, which is created by `bind({})`.
function bindConnection (connection) {
  this.connection = connection
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
        console.log('The `tabletennis` database already exists.')
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
function createTables () {

  return rethink
    .db('tabletennis')
    .tableList()
    .contains('players')
    .run(this.connection)
    .then(tablesExist => {

      if (tablesExist) {
        console.log('The `players` table already exists.')
        return
      }

      else {
        return rethink
          .db('tabletennis')
          .tableCreate('players')
          .run(this.connection)
          .then(console.log) // Todo: wrap JSON.stringify
      }
    })
}
