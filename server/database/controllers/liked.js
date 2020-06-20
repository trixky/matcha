const db = require('../database');

const likedDB = {};

likedDB.create = async (user, like) => {
    return db.none(
        `INSERT INTO liked (userid, personid, created) VALUES ('${user}', '${like}', CURRENT_TIMESTAMP);`
    )
    .then(data => null)
    .catch(err => null)
}

likedDB.wholiked = async (user) => {
    
    return db.many(
        `SELECT * FROM liked WHERE ${user} = (personid);`
    )
    .then(data => data)
    .catch(err => null);
}

likedDB.liked = async (user) => {
    
    return db.many(
        `SELECT * FROM liked WHERE ${user} = (userid);`
    )
    .then(data => data)
    .catch(err => null);
}


likedDB.delete = async (user, like) => {
    
    return db.none(
        `DELETE FROM liked WHERE ${user} = (userid) AND ${like} = (personid);`
    )
    .then(data => null)
    .catch(err => null);
}

module.exports = likedDB;