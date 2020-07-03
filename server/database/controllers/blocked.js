const db  = require("../database")
const utils = require("../../Model/utils")

const blocked = {}


blocked.create = async (userid, person) => {
    return db.none(
        `INSERT INTO blocked (userid, blockedid, blockedusername) VALUES ($1, $2, $3);`, [userid, person.id, person.username]
    )
    .then(data => null)
    .catch(err => utils.log(err));
}

blocked.isBlocked = async (userid, personid) => {

    return db.oneOrNone(
        `SELECT * FROM blocked WHERE $1 = (blockedid) AND $2 = (userid);`,[userid, personid]
    )
    .then(data => data)
    .catch(err => utils.log(err));
}

blocked.get = async (userid, personid) => {
    
    return db.oneOrNone(
        `SELECT * FROM blocked WHERE $1 = (userid) AND $2 = (blockedid);`,[userid, personid]
    )
    .then(data => data)
    .catch(err => utils.log(err));
}

blocked.getAll = async (userid) => {
    
    return db.manyOrNone(
        `SELECT * FROM blocked WHERE $1 = (userid);`,[userid]
    )
    .then(data => data)
    .catch(err => utils.log(err));
}

blocked.delete = async (userid, blockedid) => {
    
    return db.none(
        `DELETE FROM blocked WHERE $1 = (userid) AND $2 = (blockedid);`,[userid, blockedid]
    )
    .then(data => null)
    .catch(err => utils.log(err));
}

module.exports = blocked