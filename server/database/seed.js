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
    + 'viewers, '
    + 'match, '
    + 'notifications, '
    + 'fake, '
    + 'conversations, '
    + 'users ;'
)
.then(() => database.none(
    'CREATE TABLE messages'
    + '('
    + 'usersID INTEGER[] NOT NULL'
    + ', '
    + 'sender VARCHAR(31) NOT NULL'
    + ', '
    + 'message VARCHAR(300) NOT NULL'
    + ','
    + 'created TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    + ')'
)
.then(() => database.none(
    'CREATE TABLE fake'
    + '('
    + 'fakerID INTEGER NOT NULL'
    + ', '
    + 'count INTEGER NOT NULL DEFAULT 1'
    + ','
    + 'created TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    + ')'
)
.then(() => database.none(
    'CREATE TABLE liked'
    + '('
    + 'likerid INTEGER NOT NULL'
    + ', '
    + 'likedid INTEGER NOT NULL'
    + ', '
    + 'likerusername VARCHAR(31) NOT NULL'
    + ', '
    + 'likedusername VARCHAR(31) NOT NULL'
    + ', '
    + 'likerpicture VARCHAR(31) NOT NULL'
    + ', '
    + 'likedpicture VARCHAR(31) NOT NULL'
    + ', '
    + 'created TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    + ","
    + 'unique (likerid, likedid)'
    + ')'
)
.then(() => database.none(
    'CREATE TABLE blocked'
    + '('
    + 'userID INTEGER NOT NULL'
    + ', '
    + 'blockedID INTEGER NOT NULL'
    + ', '
    + 'blockedusername VARCHAR(31) NOT NULL'
    + ', '
    + 'created TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    + ')'
)
.then(() => database.none(
    'CREATE TABLE viewers'
    + '('
    + 'viewerID INTEGER NOT NULL'
    + ', '
    + 'personID INTEGER NOT NULL'
    + ', '
    + 'viewerusername VARCHAR(31) NOT NULL'
    + ', '
    + 'personusername VARCHAR(31) NOT NULL'
    + ', '
    + 'created TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    + ', '
    + ' unique (viewerID, personID)'
    + ')'
)
.then(() => database.none(
    'CREATE TABLE match'
    + '('
    + 'usersID INTEGER[] NOT NULL'
    + ', '
    + 'username VARCHAR(31)[] NOT NULL'
    + ', '
    + 'created TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    + ','
    + 'update TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    + ')'
)
.then(() => database.none(
    'CREATE TABLE notifications'
    + '('
    + 'userID INTEGER NOT NULL'
    + ', '
    + 'notification VARCHAR(300) NOT NULL'
    + ', '
    + 'read BOOLEAN DEFAULT false'
    + ', '
    + 'created TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    + ')'
)
.then(() => database.none(
    'CREATE TABLE conversations'
    + '('
    + 'usersID INTEGER[] NOT NULL'
    + ', '
    + 'usersname VARCHAR(30)[] NOT NULL'
    + ', '
    + 'created TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    + ', '
    + 'updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
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
    + "gender VARCHAR(50) NOT NULL DEFAULT 'non binary'"
    + ', '
    + "orientation VARCHAR(200) NOT NULL DEFAULT 'bisexual'"
    + ', '
    + "biography VARCHAR(500) NOT NULL DEFAULT ''"
    + ', '
    + "birthday VARCHAR(500) NOT NULL DEFAULT '1999-12-13'"
    + ', '
    + "age INTEGER NOT NULL DEFAULT 0"
    + ', '
    + "tags TEXT[] NOT NULL DEFAULT '{}'"
    + ', '
    + "profile VARCHAR(200) NOT NULL DEFAULT 'http://localhost:3002'"
    + ', '
    + "picture1 VARCHAR(200) NOT NULL DEFAULT ''"
    + ', '
    + "picture2 VARCHAR(200) NOT NULL DEFAULT ''"
    + ', '
    + "picture3 VARCHAR(200) NOT NULL DEFAULT ''"
    + ', '
    + "picture4 VARCHAR(200) NOT NULL DEFAULT ''"
    + ', '
    // people that you like
    + 'likers INTEGER DEFAULT 0'
    + ', '
    // people that liek you 
    + 'liked INTEGER DEFAULT 0'
    + ', '
    + 'match INTEGER DEFAULT 0'
    + ', '
    // people that look at you
    + 'viewers INTEGER DEFAULT 0'
    + ', '
    + 'reputation INTEGER DEFAULT 60'
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
    + 'updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP'
    + ')'
)
//------------------------------------------- RULE
.then(() => database.none(
        "CREATE OR REPLACE RULE liked "
    +   "AS ON INSERT TO "
    +   "liked "
    +   "DO "
    +   "("
    +   "UPDATE users set liked = liked + 1 WHERE id = NEW.likerid; "
    +   "UPDATE users set likers = likers + 1 WHERE id = NEW.likedid;"
    +   "INSERT INTO notifications (userid, notification) VALUES (NEW.likedid,  concat(NEW.likerusername ,' liked you, go like back'));"
    +   ");"
)
.then(() => database.none(
        "CREATE OR REPLACE RULE deleteliked "
    +   "AS ON DELETE TO "
    +   "liked "
    +   "DO "
    +   "("
    +   "UPDATE users set liked = liked - 1 WHERE id = OLD.likerid ;"
    +   "UPDATE users set likers = likers - 1 WHERE id = OLD.likedid;"
    +   ");"
)
.then(() => database.none(
        "CREATE OR REPLACE RULE match "
    +   "AS ON INSERT TO "
    +   "match "
    +   "DO "
    +   "("
    +   "UPDATE users set match = match + 1 WHERE id = ANY (NEW.usersid);"
    +   "INSERT INTO notifications (userid, notification) VALUES (NEW.usersid[1],  concat(NEW.username[2] ,' liked you to, you can start a conversation'));"
    +   "INSERT INTO notifications (userid, notification) VALUES (NEW.usersid[2],  concat(NEW.username[1] ,' liked you to, you can start a conversation'));"
    +   ");"
)
.then(() => database.none(
    "CREATE OR REPLACE RULE messages "
+   "AS ON INSERT TO "
+   "messages "
+   "DO "
+   "("
+   "INSERT INTO notifications (userid, notification) VALUES (NEW.usersid[2],  concat(NEW.sender ,' send you a message'));"
+   "UPDATE conversations SET updated = CURRENT_TIMESTAMP WHERE usersid = NEW.usersid;"
+   ")"
)
.then(() => database.none(
    "CREATE OR REPLACE RULE viewers "
+   "AS ON INSERT TO "
+   "viewers "
+   "DO "
+   "("
+   "INSERT INTO notifications (userid, notification) VALUES (NEW.personid,  concat(NEW.viewerusername ,' have look at your profile, check back'));"
+   ")"
)
//------------------------------------------- INSERT
.then(() => database.none(
    'INSERT INTO users'
    + '(id, ' 
    + ' email, '
    + ' username, '
    + ' firstname, '
    + ' name, '
    + ' password, '
    + ' gender,'
    + ' orientation,'
    + ' biography,'
    + ' birthday,'
    + ' age,'
    + ' profile,'
    + ' tags,'
    + ' latitude,'
    + ' longitude,'
    + ' reputation,'
    + ' verified, '
    + 'created)'
    + ' '
    + 'VALUES'
    + ' '
    + '('
    + " '3',"
    + " 'scarlett@marvel.com',"
    + " 'Scarlett',"
    + " 'Scarlett',"
    + " 'Johansson',"
    + " '73475cb40a568e8da8a045ced110137e159f890ac4da883b6b17dc651b3a8049',"
    + " 'woman'," 
    + " 'heterosexual',"
    + " 'Let me put you on hold.'," 
    + " '1984-11-22',"
    + " 35,"
    + " 'http://localhost:3002/profile_3',"
    + " '{sports}',"
    + "48.858674,"
    + "2.293762,"
    + "200,"
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
    + ' orientation,'
    + ' biography,'
    + ' birthday,'
    + ' age,'
    + ' profile,'
    + ' tags,'
    + ' latitude,'
    + ' longitude,'
    + ' reputation,'
    + ' verified, '
    + 'created)'
    + ' '
    + 'VALUES'
    + ' '
    + '('
    + " '2',"
    + " 'ironman@stark.com',"
    + " 'Tony',"
    + " 'Stark',"
    + " 'Tony',"
    + " '73475cb40a568e8da8a045ced110137e159f890ac4da883b6b17dc651b3a8049',"
    + " 'man'," 
    + " 'heterosexual',"
    + " 'Let s face it, this is not the worst thing you ve caught me doing.'," 
    + " '1965-04-04',"
    + " 55,"
    + " 'http://localhost:3002/profile_2',"
    + " '{}',"
    + "34.003180,"
    + "-118.807601,"
    + "120,"
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
    + ' orientation,'
    + ' biography,'
    + ' birthday,'
    + ' age,'
    + ' profile,'
    + ' latitude,'
    + ' longitude,'
    + ' tags,'
    + ' verified, '
    + 'created)'
    + ' '
    + 'VALUES'
    + ' '
    + '('
    + " '0',"
    + " '42@42.com',"
    + " '42',"
    + " '42',"
    + " '42',"
    + " '73475cb40a568e8da8a045ced110137e159f890ac4da883b6b17dc651b3a8049',"
    + " 'man'," 
    + " 'heterosexual',"
    + " '42'," 
    + " '1965-04-04',"
    + " 55,"
    + " 'http://localhost:3002/profile_0',"
    + "48.853349,"
    + "2.410537,"
    + " '{pets, sports}',"
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
    + ' orientation,'
    + ' biography,'
    + ' birthday,'
    + ' age,'
    + ' profile,'
    + ' tags,'
    + ' latitude,'
    + ' longitude,'
    + ' verified, '
    + 'created)'
    + ' '
    + 'VALUES'
    + ' '
    + '('
    + " '1',"
    + " 'ElonMusk@telsa.com',"
    + " 'Elon',"
    + " 'Elon',"
    + " 'Musk',"
    + " '73475cb40a568e8da8a045ced110137e159f890ac4da883b6b17dc651b3a8049',"
    + " 'man'," 
    + " 'heterosexual',"
    + " 'When something is important enough, you do it even if the odds are not in your favor.'," 
    + " '1971-06-28',"
    + " 49,"
    + " 'http://localhost:3002/profile_1',"
    + " '{}',"
    + "37.446280,"
    + "-122.122392,"
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
    + ' orientation,'
    + ' biography,'
    + ' birthday,'
    + ' age,'
    + ' profile,'
    + ' tags,'
    + ' latitude,'
    + ' longitude,'
    + ' verified, '
    + 'created)'
    + ' '
    + 'VALUES'
    + ' '
    + '('
    + " '4',"
    + " 'BillGates@microsoft.com',"
    + " 'Bill',"
    + " 'Bill',"
    + " 'Gates',"
    + " '73475cb40a568e8da8a045ced110137e159f890ac4da883b6b17dc651b3a8049',"
    + " 'man'," 
    + " 'heterosexual',"
    + " 'Your most unhappy customers are your greatest source of learning.'," 
    + " '1955-10-28',"
    + " 64,"
    + " 'http://localhost:3002/profile_4',"
    + " '{reading}',"
    + "47.623402,"
    + "-122.241729,"
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
    + ' orientation,'
    + ' biography,'
    + ' birthday,'
    + ' age,'
    + ' profile,'
    + ' tags,'
    + ' latitude,'
    + ' longitude,'
    + ' verified, '
    + 'created)'
    + ' '
    + 'VALUES'
    + ' '
    + '('
    + " '5',"
    + " 'Pauline@elite.com',"
    + " 'Pauline',"
    + " 'Pauline',"
    + " 'Hoarau',"
    + " '73475cb40a568e8da8a045ced110137e159f890ac4da883b6b17dc651b3a8049',"
    + " 'women'," 
    + " 'heterosexual',"
    + " 'Something'," 
    + " '1994-03-03',"
    + " 26,"
    + " 'http://localhost:3002/profile_5',"
    + " '{reading}',"
    + "48.855424,"
    + "2.366662,"
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
    + ' orientation,'
    + ' biography,'
    + ' birthday,'
    + ' age,'
    + ' profile,'
    + ' tags,'
    + ' latitude,'
    + ' longitude,'
    + " reputation,"
    + ' verified, '
    + 'created)'
    + ' '
    + 'VALUES'
    + ' '
    + '('
    + " '6',"
    + " 'Barbara@elite.com',"
    + " 'Barbara',"
    + " 'Barbara',"
    + " 'Palvin',"
    + " '73475cb40a568e8da8a045ced110137e159f890ac4da883b6b17dc651b3a8049',"
    + " 'women'," 
    + " 'heterosexual',"
    + " 'Something'," 
    + " '1993-10-08',"
    + " 26,"
    + " 'http://localhost:3002/profile_6',"
    + " '{sports}',"
    + "48.855424,"
    + "2.366662,"
    + "180,"
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
    + ' orientation,'
    + ' biography,'
    + ' birthday,'
    + ' age,'
    + ' profile,'
    + ' tags,'
    + ' latitude,'
    + ' longitude,'
    + ' verified, '
    + 'created)'
    + ' '
    + 'VALUES'
    + ' '
    + '('
    + " '7',"
    + " 'Taylor@elite.com',"
    + " 'Taylor',"
    + " 'Taylor',"
    + " 'Marie Hill',"
    + " '73475cb40a568e8da8a045ced110137e159f890ac4da883b6b17dc651b3a8049',"
    + " 'women'," 
    + " 'heterosexual',"
    + " 'Something'," 
    + " '1996-03-05',"
    + " 24,"
    + " 'http://localhost:3002/profile_7',"
    + " '{sports}',"
    + "48.855424,"
    + "2.366662,"
    + " null,"
    + " CURRENT_TIMESTAMP"
    + ")",
)))))))))))))))))))))))
.then(_exit).catch(_exit);

