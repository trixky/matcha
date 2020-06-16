const pgp = require('pg-promise')();

const database = pgp('postgres://user:password@localhost:5432/database');

/*
** Example
** +) docker run --name database \
                 -p 5432:5432 \
                 -e POSTGRES_USER=user \
                 -e POSTGRES_PASSWORD=password \
                 -e POSTGRES_DB=database \
                 -d \
                 postgres
*/

module.exports = database;
