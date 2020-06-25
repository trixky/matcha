const db  = require("../database")
const utils =require("../../Model/utils")

const matchDB = {};


matchDB.create = async (user1, user2) =>{
    return db.none(
        `INSERT INTO match (usersID, username, created) VALUES ('{$1, $2}', '{$3, $4}', CURRENT_TIMESTAMP)`,[user1.id, user2.id, user1.uername, user2.username]
    )
    .then(data => null)
    .catch(err => utils.log(err));
}

matchDB.find = async (user1, user2) =>{
    return  db.oneOrNone(
        `SELECT * FROM match WHERE $1 = ANY (usersid) AND $2 = ANY (usersid);`,[user1.id, user2.id]
    )
    .then(data => data)
    .catch(err => utils.log(err));
}

matchDB.findAll = async (userid) =>{
    return  db.many(
        `SELECT * FROM match WHERE $1 = ANY (usersid) ORDER BY update DESC;`,[userid]
    )
    .then(data => data)
    .catch(err => utils.log(err));
}

matchDB.findAllByUsername = async (username) =>{
    return  db.many(
        `SELECT * FROM match WHERE $1 = ANY (username) ORDER BY update DESC;`,[username]
    )
    .then(data => data)
    .catch(err => utils.log(err));
}

matchDB.delete = async (user1, user2) =>{
    return  db.none(
        `DELETE FROM match WHERE $1 = ANY (usersid) AND $2 = ANY (usersid);`,[user1.id, user2.id]
    )
    .then(data => null)
    .catch(err => utils.log(err));
}

matchDB.update = async (user1, user2) =>{
    return  db.none(
        `UPDATE match SET update = CURRENT_TIMESTAMP WHERE $1 = ANY (usersid) AND $2 = ANY (usersid);`,[user1.id, user2.id]
    )
    .then(data => null)
    .catch(err => utils.log(err));
}

module.exports = matchDB
