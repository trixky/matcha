const pgp = require('pg-promise')();

const database = pgp('postgres://user:password@database:5432/database');

module.exports = database;
