const db = require('../database');
const utils = require("../../Model/utils")
const likedDB = {};

const pictureServer = "http://localhost:3002"

likedDB.create = async (liker, liked) => {
    return db.none(
        `INSERT INTO liked (likerid, likedid, likerusername, likedusername, likerpicture, likedpicture, created) VALUES ('${liker.id}', '${liked.id}', '${liker.username}', '${liked.username}', '${pictureServer}/profile_${liker.id}', '${pictureServer}/profile_${liked.id}' , CURRENT_TIMESTAMP);`
    )
    .then(data => null)
    .catch(err => utils.log(err))
}

likedDB.getAllLiked = async (userid) => {
    
    return db.many(
        `SELECT * FROM liked WHERE ${userid} = (likerid);`
    )
    .then(data => data)
    .catch(err => utils.log(err))
}

likedDB.getAlllikers = async (userid) => {
    
    return db.many(
        `SELECT * FROM liked WHERE ${userid} = (likedid);`
    )
    .then(data => data)
    .catch(err => utils.log(err))
}

likedDB.delete = async (likerid, likedid) => {
    
    return db.none(
        `DELETE FROM liked WHERE ${likerid} = (likerid) AND ${likedid} = (likedid);`
    )
    .then(data => null)
    .catch(err => utils.log(err))
}

module.exports = likedDB;