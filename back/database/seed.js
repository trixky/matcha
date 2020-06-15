const pgp = require('pg-promise')();

const database = pgp('postgres://user:password@localhost:5432/database');

function _exit(value){
    console.error(value);
    process.exit(1);
}

database.none(
    'CREATE TABLE users'
    + '('
    + 'id INTEGER NOT NULL PRIMARY KEY'
    + ', '
    + 'name VARCHAR(32) NOT NULL'
    + ', '
    + 'created TIMESTAMP NOT NULL'
    + ', '
    + 'modified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP'
    + ')'
).then(function() {
    database.none(
        'INSERT INTO users(id, name, created)'
        + ' '
        + 'SELECT COUNT(*) AS id, $1 AS name, CURRENT_TIMESTAMP as created'
        + ' FROM users',
        ['cal']
    ).then(function() {
        database.any(
            'SELECT * FROM users'
        ).then(_exit).catch(_exit);

    }).catch(_exit);

}).catch(_exit);

