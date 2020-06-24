const db = require('../database');

const messagesDB = {};


messagesDB.create = async (senderid, personid , sendername, message) => {
    return db.none(
        `INSERT INTO messages (usersid, sender, message, created) VALUES ('{$1, $2}', '$3', '$4', CURRENT_TIMESTAMP);`,[senderid, personid, sendername, message]
    )
    .then(data => null)
    .catch(err => null)
}

messagesDB.getAll= async (user1id, user2id) => {
    return db.many(
        `SELECT * FROM messages WHERE $1 = ANY (usersid) AND $2 = ANY (usersid);`,[user1id, user2id]
    )
    .then(data => data)
    .catch(err => null)
}

messagesDB.delete= async (user1id, user2id) => {
    return db.none(
        `DELETE FROM messages WHERE $1 = ANY (usersid) AND $2 = ANY (usersid);`,[user1id, user2id]
    )
    .then(data => null)
    .catch(err => null)
}


module.exports = messagesDB;