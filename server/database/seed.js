const pgp = require('pg-promise')();

const database = pgp('postgres://user:password@localhost:5432/database');

function _exit(value){
    console.error(value);
    process.exit(0);
}

database.none(
    'CREATE TABLE users'
    + '('
    + 'id INTEGER NOT NULL PRIMARY KEY'
    + ', '
    + 'email VARCHAR(320) NOT NULL UNIQUE'
    + ','
    + 'username VARCHAR(31) NOT NULL'
    + ', '
    + 'firstname VARCHAR(255) NOT NULL'
    + ', '
    + 'lastname VARCHAR(255) NOT NULL'
    + ', '
    + 'password VARCHAR(255) NOT NULL'
    + ', '
    + 'created TIMESTAMP NOT NULL'
    + ', '
    + 'modified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP'
    + ')'
).then(_exit).catch(_exit);

