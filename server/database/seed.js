const pgp = require('pg-promise')();

const database = pgp('postgres://user:password@database:5432/database');

function _exit(value){
    console.error(value);
    process.exit(0);
}

database.none(
    'DROP TABLE '
    + ' IF EXISTS '
    + 'messages, '
    + 'liked, '
    + 'blocked, '
    + 'looked, '
    + 'relationship, '
    + 'users ;'
)
.then(() => database.none(
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
.then(() => database.none(
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
.then(() => database.none(
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
.then(() => database.none(
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
.then(() => database.none(
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
.then(() => database.none(
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
    + 'name VARCHAR(255) NOT NULL'
    + ', '
    + 'password CHAR(64) NOT NULL'
    + ', '
    + "gender CHAR(1) NOT NULL DEFAULT 'b'"
    + ', '
    + "sexualPref CHAR(1) NOT NULL DEFAULT 'b'"
    + ', '
    + 'biography VARCHAR(500)'
    + ', '
    + 'tag TEXT[]'
    + ', '
    + 'picture TEXT[]'
    + ', '
    // people that you like
    + 'haveLiked INTEGER DEFAULT 0'
    + ', '
    // people that liek you 
    + 'beenLiked INTEGER DEFAULT 0'
    + ', '
    + 'match INTEGER DEFAULT 0'
    + ', '
    // people that look at you
    + 'looked INTEGER DEFAULT 0'
    + ', '
    + 'fame INTEGER DEFAULT 60'
    + ', '
    + 'latitude NUMERIC DEFAULT 0'
    + ', '
    + 'longitude NUMERIC DEFAULT 0'
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
.then(() => database.none(
    'INSERT INTO users'
    + '(id, ' 
    + ' email, '
    + ' username, '
    + ' firstname, '
    + ' name, '
    + ' password, '
    + ' gender,'
    + ' sexualPref,'
    + ' biography,'
    + ' tag,'
    + ' verified, '
    + 'created)'
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
    + " 'm'," 
    + " 'm',"
    + " 'Salut , je represente 42'," 
    + " '{toto, tata}',"
    + ' null, '
    + " CURRENT_TIMESTAMP"
    + ")",    
)
.then(() => database.none(
    'INSERT INTO users'
    + '(id, ' 
    + ' email, '
    + ' username, '
    + ' firstname, '
    + ' name, '
    + ' password, '
    + ' gender,'
    + ' sexualPref,'
    + ' biography,'
    + ' tag,'
    + ' verified, '
    + 'created)'
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
    + " 'f'," 
    + " 'm',"
    + " 'Salut , je suis momota'," 
    + " '{moai, tatie}',"
    + " null,"
    + " CURRENT_TIMESTAMP"
    + ")",    
)
.then(() => database.none(
    'INSERT INTO users'
    + '(id, ' 
    + ' email, '
    + ' username, '
    + ' firstname, '
    + ' name, '
    + ' password, '
    + ' gender,'
    + ' sexualPref,'
    + ' biography,'
    + ' tag,'
    + ' verified, '
    + 'created)'
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
    + " 'f'," 
    + " 'm',"
    + " 'Salut , je represente momo'," 
    + " '{cinema, star}',"
    + " null,"
    + " CURRENT_TIMESTAMP"
    + ")",    
)
.then(() => database.none(
    'INSERT INTO users'
    + '(id, ' 
    + ' email, '
    + ' username, '
    + ' firstname, '
    + ' name, '
    + ' password, '
    + ' gender,'
    + ' sexualPref,'
    + ' biography,'
    + ' tag,'
    + ' verified, '
    + 'created)'
    + ' '
    + 'VALUES'
    + ' '
    + '('
    + " '0',"
    + " 'email@email.com',"
    + " 'usermane',"
    + " 'firstname',"
    + " 'name',"
    + " 'password',"
    + " 'f'," 
    + " 'm',"
    + " 'Salut , je sus firstname'," 
    + " '{gaming, computer}',"
    + " null,"
    + " CURRENT_TIMESTAMP"
    + ")",    
)))))))))))
.then(_exit).catch(_exit);

