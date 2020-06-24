const db  = require("../database")

const blocked = {}


blocked.create = async (userid, person) => {
    return db.none(
        `INSERT INTO blocked (userid, personid, username) VALUES ($1, $2, '$3');`, [userid, person.id, person.username]
    )
    .then(data => null)
    .catch(err => null);
}

blocked.isBlocked = async (userid, personid) => {
    
    return db.one(
        `SELECT * FROM blocked WHERE $1 = (personid) AND $2 = (userid);`,[userid, personid]
    )
    .then(data => data)
    .catch(err => null);
}

blocked.get = async (userid, personid) => {
    
    return db.one(
        `SELECT * FROM blocked WHERE $1 = (userid) AND $2 = (personid);`,[userid, personid]
    )
    .then(data => data)
    .catch(err => null);
}

blocked.getAll = async (userid) => {
    
    return db.many(
        `SELECT * FROM blocked WHERE $1 = (userid);`,[userid]
    )
    .then(data => data)
    .catch(err => null);
}

blocked.delete = async (userid, blockedid) => {
    
    return db.none(
        `DELETE FROM blocked WHERE $1 = (userid) AND $2 = (personid);`,[userid, blockedid]
    )
    .then(data => null)
    .catch(err => null);
}

module.exports = blocked