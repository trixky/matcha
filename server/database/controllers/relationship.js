const db  = require("../database")

const relationshipDB = {};


relationshipDB.create = async (user1, user2) =>{
    return db.none(
        `INSERT INTO relationship (usersID, created) VALUES ('{${user1}, ${user2}}', CURRENT_TIMESTAMP)`
    )
    .then(data => null)
    .then(err => null);
}

relationshipDB.find = async (user1, user2) =>{
    return  db.one(
        `SELECT * FROM relationship WHERE ${user1} = ANY (usersid) AND ${user2} = ANY (usersid);`
    )
    .then(data => data)
    .catch(err => null);
}

relationshipDB.findAll = async (user) =>{
    return  db.many(
        `SELECT * FROM relationship WHERE ${user} = ANY (usersid) ORDER BY update DESC;`
    )
    .then(data => data)
    .catch(err => null);
}

relationshipDB.delete = async (user1, user2) =>{
    return  db.none(
        `DELETE FROM relationship WHERE ${user1} = ANY (usersid) AND ${user2} = ANY (usersid);`
    )
    .then(data => null)
    .catch(err => null);
}

module.exports = relationshipDB
