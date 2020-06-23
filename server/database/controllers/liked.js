const db = require('../database');
const utils = require("../../Model/utils")
const likedDB = {};

likedDB.create = async (user, liked) => {
    return db.none(
        `INSERT INTO liked (userid, personid, username, created) VALUES ('${user.id}', '${liked.id}', '{${user.username}, ${liked.username}}', CURRENT_TIMESTAMP);`
    )
    .then(data => null)
    .catch(err => utils.log(err))
}

likedDB.getAll = async (userid) => {
    
    return db.many(
        `SELECT * FROM liked WHERE ${userid} = (personid);`
    )
    .then(data => data)
    .catch(err => utils.log(err))
}

likedDB.liked = async (userid) => {
    
    return db.many(
        `SELECT * FROM liked WHERE ${userid} = (userid);`
    )
    .then(data => data)
    .catch(err => utils.log(err))
}

likedDB.delete = async (userid, likedid) => {
    
    return db.none(
        `DELETE FROM liked WHERE ${userid} = (userid) AND ${likedid} = (personid);`
    )
    .then(data => null)
    .catch(err => utils.log(err))
}

module.exports = likedDB;