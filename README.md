For development:

1. Install node & npm globally.
2. Do `npm install` in root to get dependencies.
3. Do `npm run start` to start the server (with hotloading on changes).
4. Do `npm run --silent unit-tests` to run unit tests (without the NPM error spam
  if one of the tests fails).


For local database:

1. Install RethinkDB: https://www.rethinkdb.com/docs/install
2. Do `rethinkdb` to start the RethinkDB server.
3. Do `npm run provision` to set up the database.
4. You can connect to http://localhost:8080/ to administer the database.


Ubuntu server commands:

1. Run DB in background: `rethinkdb --bind all &`
2. Bring it to foreground (to kill): `fg`
