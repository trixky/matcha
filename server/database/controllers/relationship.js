const db  = require("../database")

const matchDB = {};


matchDB.create = async (user1, user2) =>{
    return db.none(
        `INSERT INTO match (usersID, username, created) VALUES ('{${user1.id}, ${user2.id}}', '{${user1.username}, ${user2.username}}', CURRENT_TIMESTAMP)`
    )
    .then(data => null)
    .then(err => null);
}

matchDB.find = async (user1, user2) =>{
    return  db.one(
        `SELECT * FROM match WHERE ${user1.id} = ANY (usersid) AND ${user2.id} = ANY (usersid);`
    )
    .then(data => data)
    .catch(err => null);
}

matchDB.findAll = async (userid) =>{
    return  db.many(
        `SELECT * FROM match WHERE ${userid} = ANY (usersid) ORDER BY update DESC;`
    )
    .then(data => data)
    .catch(err => null);
}

matchDB.findAllByUsername = async (username) =>{
    return  db.many(
        `SELECT * FROM match WHERE ${username} = ANY (username) ORDER BY update DESC;`
    )
    .then(data => data)
    .catch(err => null);
}

matchDB.delete = async (user1, user2) =>{
    return  db.none(
        `DELETE FROM match WHERE ${user1.id} = ANY (usersid) AND ${user2.id} = ANY (usersid);`
    )
    .then(data => null)
    .catch(err => null);
}

matchDB.update = async (user1, user2) =>{
    return  db.none(
        `UPDATE match SET update = CURRENT_TIMESTAMP WHERE ${user1.id} = ANY (usersid) AND ${user2.id} = ANY (usersid);`
    )
    .then(data => null)
    .catch(err => null);
}

module.exports = matchDB
