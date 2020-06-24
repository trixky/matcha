const db  = require("../database")

const viewers = {}


viewers.create = async (user, person) => {
    return db.none(
        `INSERT INTO viewers (userid, personid, username) VALUES ($1, $2, '$3');`,[user.id, person.id, person.uername]
    )
    .then(data => null)
    .catch(err => null);
}

viewers.getAll = async (userid) => {
    
    return db.many(
        `SELECT * FROM viewers WHERE $1 = (personid);`,[userid]
    )
    .then(data => data)
    .catch(err => null);
}

viewers.viewers = async (userid) => {
    
    return db.many(
        `SELECT * FROM viewers WHERE $1 = (userid);`,[userid]
    )
    .then(data => data)
    .catch(err => null);
}

viewers.delete = async (userid, viewersid) => {
    
    return db.none(
        `DELETE FROM viewers WHERE $1 = (userid) AND $2 = (personid);`,[userid, viewersid]
    )
    .then(data => null)
    .catch(err => null);
}

module.exports = viewers