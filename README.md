Documentation:

http://docs.tabletennisapi.apiary.io


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


For the real database, set the Node environment variables when running the app
or the task like so:

`DB_IP="{ip}" DB_PASSWORD="{pw}" node {task}`


Ubuntu server commands:

1. Connect: `ssh root@{ip}`
2. Run DB in background: `rethinkdb --bind all --no-http-admin &`
3. Look for background processes: `ps -ef | grep rethink`
4. Stop database: `killall -9 rethinkdb`
