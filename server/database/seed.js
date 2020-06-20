const pgp = require('pg-promise')();

const database = pgp('postgres://user:password@database:5432/database');

function _exit(value){
    console.error(value);
    process.exit(0);
}

database.none(
    'CREATE TABLE messages'
    + '('
    + 'personID INTEGER[]'
    + ', '
    + 'sender VARCHAR(31)'
    + ', '
    + 'message VARCHAR(300)'
    + ','
    + 'created TIMESTAMP NOT NULL'
    + ')'
)

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
    + 'password CHAR(64) NOT NULL'
    + ', '
    + 'gender CHAR(1)'
    + ', '
    + 'sexualPref CHAR(1)'
    + ', '
    + 'biography VARCHAR(500)'
    + ', '
    + 'tag TEXT[]'
    + ', '
    + 'picture TEXT[]'
    + ', '
    // people that you like
    + 'haveLiked INTEGER[]'
    + ', '
    // people that liek you 
    + 'beenLiked INTEGER[]'
    + ', '
    // people that look at you
    + 'looked INTEGER[]'
    + ', '
    + 'fame INTEGER DEFAULT 60'
    + ', '
    + 'latitude NUMERIC'
    + ', '
    + 'longitude NUMERIC'
    + ', '
    + 'verified CHAR(64)'
    + ', '
    + 'created TIMESTAMP NOT NULL'
    + ', '
    + 'modified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP'
    + ')'
).then(_exit).catch(_exit);

// database.none(
//     'INSERT INTO users'
//     + '(id, email, username, firstname, lastname, password, verified, created)'
//     + ' '
//     + 'VALUES'
//     + ' '
//     + '('
//     + ' COUNT(*),'
//     + ' email@email.com,'
//     + ' usermane,'
//     + ' firstname,'
//     + ' lastname,'
//     + ' password,'
//     + ' null,'
//     + ' null,'
//     + ' null,'
//     + ' CURRENT_TIMESTAMP as created'
//     + ' FROM users',    
// )
// .then(_exit).catch(_exit);

