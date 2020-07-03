const db = require("../database")
const utils = require("../../Model/utils")
const likedDB = require("./liked")

const match = {}

match.create = async (user1, user2) => {
    return db.none(
        "INSERT INTO match (usersid, username) VALUES ('{$1,$2}', ARRAY [$3, $4]);",[user1.id, user2.id, user1.username, user2.username]
    )
    .then(data => data)
    .catch(err => utils.log(err))
}

match.getAllById = async (userid) => {
    return db.manyOrNone(
        "SELECT * FROM match WHERE $1 = ANY (usersid);",[userid]
    )
    .then(data => data)
    .catch(err => utils.log(err))
}

match.getById = async (user1, user2) => {
    return db.oneOrNone(
        "SELECT * FROM match WHERE $1 = ANY (usersid) AND $2 = ANY (usersid);",[user1, user2]
    )
    .then(data => data)
    .catch(err => utils.log(err))
}

match.delete = async (user1id, user2id) => {
    return db.none(
        "DELETE FROM match WHERE $1 = ANY (userid) AND $2 = ANY (userid);",[user1.id, user2.id]
    )
    .then(data => data)
    .catch(err => utils.log(err))
}

match.checkAndCreate = async (user1 , user2) => {
    return likedDB.findOneLikeById(user1.id, user2.id)
    .then(data => {
        if (data)
            return likedDB.findOneLikeById(user2.id, user1.id)
                .then(data => {
                    if (data)
                    return match.create(user1, user2)
                        .then(data => true)
                        .catch(err => utils.log(err))
                    return null;
                })
                .catch(err => utils.log(err))
        return null;
    })
    .catch(err => utils.log(err))
}

module.exports = match;