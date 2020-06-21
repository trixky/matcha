const pgp = require('pg-promise')();

const database = pgp('postgres://user:password@database:5432/database');

function _exit(value){
    console.error(value);
    process.exit(0);
}

database.none(
    'CREATE TABLE messages'
    + '('
    + 'usersID INTEGER[]'
    + ', '
    + 'sender VARCHAR(31)'
    + ', '
    + 'message VARCHAR(300)'
    + ','
    + 'created TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    + ')'
)

database.none(
    'CREATE TABLE liked'
    + '('
    + 'userID INTEGER'
    + ', '
    + 'personID INTEGER'
    + ', '
    + 'username VARCHAR(31)'
    + ', '
    + 'created TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    + ')'
)

database.none(
    'CREATE TABLE blocked'
    + '('
    + 'userID INTEGER'
    + ', '
    + 'personID INTEGER'
    + ', '
    + 'username VARCHAR(31)'
    + ', '
    + 'created TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    + ')'
)

database.none(
    'CREATE TABLE looked'
    + '('
    + 'userID INTEGER'
    + ', '
    + 'personID INTEGER'
    + ', '
    + 'username VARCHAR(31)'
    + ', '
    + 'created TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    + ')'
)

database.none(
    'CREATE TABLE relationship'
    + '('
    + 'usersID INTEGER[]'
    + ', '
    + 'username VARCHAR(31)[]'
    + ', '
    + 'created TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    + ','
    + 'update TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
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
    + 'connected BOOLEAN DEFAULT false'
    + ', '
    + 'created TIMESTAMP NOT NULL'
    + ', '
    + 'modified TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP'
    + ')'
)


database.none(
    'INSERT INTO users'
    + '(id, email, username, firstname, lastname, password, verified, created)'
    + ' '
    + 'VALUES'
    + ' '
    + '('
    + " '3',"
    + " '42@42.com',"
    + " '42',"
    + " '42',"
    + " '42',"
    + " '73475cb40a568e8da8a045ced110137e159f890ac4da883b6b17dc651b3a8049',"
    + " null,"
    + " CURRENT_TIMESTAMP"
    + ")",    
)

database.none(
    'INSERT INTO users'
    + '(id, email, username, firstname, lastname, password, verified, created)'
    + ' '
    + 'VALUES'
    + ' '
    + '('
    + " '2',"
    + " 'email3@email.com',"
    + " 'momota',"
    + " 'sito',"
    + " 'lunie',"
    + " 'password',"
    + " null,"
    + " CURRENT_TIMESTAMP"
    + ")",    
)

database.none(
    'INSERT INTO users'
    + '(id, email, username, firstname, lastname, password, verified, created)'
    + ' '
    + 'VALUES'
    + ' '
    + '('
    + " '1',"
    + " 'email2@email.com',"
    + " 'momo',"
    + " 'star',"
    + " 'lune',"
    + " 'password',"
    + " null,"
    + " CURRENT_TIMESTAMP"
    + ")",    
)


database.none(
    'INSERT INTO users'
    + '(id, email, username, firstname, lastname, password, verified, created)'
    + ' '
    + 'VALUES'
    + ' '
    + '('
    + " '0',"
    + " 'email@email.com',"
    + " 'usermane',"
    + " 'firstname',"
    + " 'lastname',"
    + " 'password',"
    + " null,"
    + " CURRENT_TIMESTAMP"
    + ")",    
).then(_exit).catch(_exit);

