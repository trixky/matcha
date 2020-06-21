const db  = require("../database")

const looked = {}


looked.create = async (user, person) => {
    return db.none(
        `INSERT INTO looked (userid, personid, username) VALUES (${user.id}, ${person.id}, '${person.username}');`
    )
    .then(data => null)
    .catch(err => null);
}

looked.getAll = async (userid) => {
    
    return db.many(
        `SELECT * FROM looked WHERE ${userid} = (personid);`
    )
    .then(data => data)
    .catch(err => null);
}

looked.looked = async (userid) => {
    
    return db.many(
        `SELECT * FROM looked WHERE ${userid} = (userid);`
    )
    .then(data => data)
    .catch(err => null);
}

looked.delete = async (userid, lookedid) => {
    
    return db.none(
        `DELETE FROM looked WHERE ${userid} = (userid) AND ${lookedid} = (personid);`
    )
    .then(data => null)
    .catch(err => null);
}

module.exports = looked