const db  = require("../database")

const relationshipDB = {};


relationshipDB.create = async (user1, user2) =>{
    return db.none(
        `INSERT INTO relationship (usersID, username, created) VALUES ('{${user1.id}, ${user2.id}}', '{${user1.username}, ${user2.username}}', CURRENT_TIMESTAMP)`
    )
    .then(data => null)
    .then(err => null);
}

relationshipDB.find = async (user1, user2) =>{
    return  db.one(
        `SELECT * FROM relationship WHERE ${user1.id} = ANY (usersid) AND ${user2.id} = ANY (usersid);`
    )
    .then(data => data)
    .catch(err => null);
}

relationshipDB.findAll = async (userid) =>{
    return  db.many(
        `SELECT * FROM relationship WHERE ${userid} = ANY (usersid) ORDER BY update DESC;`
    )
    .then(data => data)
    .catch(err => null);
}

relationshipDB.findAllByUsername = async (username) =>{
    return  db.many(
        `SELECT * FROM relationship WHERE ${username} = ANY (username) ORDER BY update DESC;`
    )
    .then(data => data)
    .catch(err => null);
}

relationshipDB.delete = async (user1, user2) =>{
    return  db.none(
        `DELETE FROM relationship WHERE ${user1.id} = ANY (usersid) AND ${user2.id} = ANY (usersid);`
    )
    .then(data => null)
    .catch(err => null);
}

relationshipDB.update = async (user1, user2) =>{
    return  db.none(
        `UPDATE relationship SET update = CURRENT_TIMESTAMP WHERE ${user1.id} = ANY (usersid) AND ${user2.id} = ANY (usersid);`
    )
    .then(data => null)
    .catch(err => null);
}

module.exports = relationshipDB
