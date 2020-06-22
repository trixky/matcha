const db  = require("../database")

const viewers = {}


viewers.create = async (user, person) => {
    return db.none(
        `INSERT INTO viewers (userid, personid, username) VALUES (${user.id}, ${person.id}, '${person.username}');`
    )
    .then(data => null)
    .catch(err => null);
}

viewers.getAll = async (userid) => {
    
    return db.many(
        `SELECT * FROM viewers WHERE ${userid} = (personid);`
    )
    .then(data => data)
    .catch(err => null);
}

viewers.viewers = async (userid) => {
    
    return db.many(
        `SELECT * FROM viewers WHERE ${userid} = (userid);`
    )
    .then(data => data)
    .catch(err => null);
}

viewers.delete = async (userid, viewersid) => {
    
    return db.none(
        `DELETE FROM viewers WHERE ${userid} = (userid) AND ${viewersid} = (personid);`
    )
    .then(data => null)
    .catch(err => null);
}

module.exports = viewers