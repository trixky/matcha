const db = require('../database');
const utils = require("../../Model/utils")

const messagesDB = {};


messagesDB.create = async (senderid, personid , sendername, message) => {
    var time = utils.getDate()
    return db.none(
        `INSERT INTO messages (usersid, sender, message, created) VALUES ('{$1, $2}', $3, $4, $5);`,[senderid, personid, sendername, message, time]
    )
    .then(data => null)
    .catch(err => utils.log(err));
}

messagesDB.getAll= async (user1id, user2id) => {
    return db.many(
        `SELECT * FROM messages WHERE $1 = ANY (usersid) AND $2 = ANY (usersid);`,[user1id, user2id]
    )
    .then(data => data)
    .catch(err => utils.log(err));
}

messagesDB.delete= async (user1id, user2id) => {
    return db.none(
        `DELETE FROM messages WHERE $1 = ANY (usersid) AND $2 = ANY (usersid);`,[user1id, user2id]
    )
    .then(data => null)
    .catch(err => utils.log(err));
}


module.exports = messagesDB;