const db = require('../database');

const likedDB = {};

likedDB.create = async (user, liked) => {
    return db.one(
        `INSERT INTO liked (userid, personid, username, created) VALUES ('${user.id}', '${liked.id}', '{${user.username}, ${liked.username}}', CURRENT_TIMESTAMP);`
    )
    .then(data => null)
    .catch(err => null)
}

likedDB.getAll = async (userid) => {
    
    return db.many(
        `SELECT * FROM liked WHERE ${userid} = (personid);`
    )
    .then(data => data)
    .catch(err => null);
}

likedDB.liked = async (userid) => {
    
    return db.many(
        `SELECT * FROM liked WHERE ${userid} = (userid);`
    )
    .then(data => data)
    .catch(err => null);
}

likedDB.delete = async (userid, likedid) => {
    
    return db.none(
        `DELETE FROM liked WHERE ${userid} = (userid) AND ${likedid} = (personid);`
    )
    .then(data => null)
    .catch(err => null);
}

module.exports = likedDB;