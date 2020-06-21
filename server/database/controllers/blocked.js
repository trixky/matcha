const db  = require("../database")

const blocked = {}


blocked.create = async (userid, person) => {
    return db.none(
        `INSERT INTO blocked (userid, personid, username) VALUES (${userid}, ${person.id}, '${person.username}');`
    )
    .then(data => null)
    .catch(err => null);
}

blocked.isBlocked = async (userid, personid) => {
    
    return db.one(
        `SELECT * FROM blocked WHERE ${userid} = (personid) AND ${personid} = (userid);`
    )
    .then(data => data)
    .catch(err => null);
}

blocked.get = async (userid, personid) => {
    
    return db.one(
        `SELECT * FROM blocked WHERE ${userid} = (userid) AND ${personid} = (personid);`
    )
    .then(data => data)
    .catch(err => null);
}

blocked.getAll = async (userid) => {
    
    return db.many(
        `SELECT * FROM blocked WHERE ${userid} = (userid);`
    )
    .then(data => data)
    .catch(err => null);
}

blocked.delete = async (userid, blockedid) => {
    
    return db.none(
        `DELETE FROM blocked WHERE ${userid} = (userid) AND ${blockedid} = (personid);`
    )
    .then(data => null)
    .catch(err => null);
}

module.exports = blocked