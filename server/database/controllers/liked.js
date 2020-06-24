const db = require('../database');
const utils = require("../../Model/utils")
const likedDB = {};

const pictureServer = "http://localhost:3002"

likedDB.create = async (liker, liked) => {
    return db.none(
        `INSERT INTO liked (likerid, likedid, likerusername, likedusername, likerpicture, likedpicture, created)
         VALUES ( $1, $2, $3, $4, '${pictureServer}/profile_$1', '${pictureServer}/profile_$2', CURRENT_TIMESTAMP);`,[liker.id, liked.id, liker.username, liked.username]
    )
    .then(data => null)
    .catch(err => utils.log(err))
}

likedDB.findOneLike = async (liker, liked) => {
    return db.oneOrNone(
        `SELECT * FROM liked WHERE likerid = $1 AND likedid = $2;`, [liker.id, liked.id]
    )
    .then(data => data)
    .catch(err => utils.log(err))
}

likedDB.getAllLiked = async (userid) => {
    
    return db.many(
        `SELECT * FROM liked WHERE $1 = (likerid);`,[userid]
    )
    .then(data => data)
    .catch(err => utils.log(err))
}

likedDB.getAlllikers = async (userid) => {
    
    return db.many(
        `SELECT * FROM liked WHERE $1 = (likedid);`, [userid]
    )
    .then(data => data)
    .catch(err => utils.log(err))
}

likedDB.delete = async (likerid, likedid) => {
    
    return db.none(
        `DELETE FROM liked WHERE $1 = (likerid) AND $2 = (likedid);`,[likerid, likedid]
    )
    .then(data => null)
    .catch(err => utils.log(err))
}

module.exports = likedDB;