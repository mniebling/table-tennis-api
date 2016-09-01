// Run this script to set up the database for the first time.
const rethink = require('rethinkdb')


// Initialize database connection
// Todo: refactor database communication into a separate module.
var params =
  { host: 'localhost'
  , port: 28015
  }

rethink
  .connect(params)
  .then(connection => {

    // Check if the database exists
    return rethink
      .dbList()
      .contains('tabletennis')
      .run(connection)
      .then(dbExists => {

        if (dbExists) {
          console.log('The `tabletennis` database already exists.')
        }

        // If it does not, we should create it
        else {
          return rethink
            .dbCreate('tabletennis')
            .run(connection)
            .then(console.log) // Todo: wrap JSON.stringify
        }
      })

  })
  .catch(console.error)
  .finally(process.exit)
