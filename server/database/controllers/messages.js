const db = require('../database');

const messages = {};


messages.create = async (senderid, personid , sendername, message) => {
    return db.none(
        `INSERT INTO messages (usersid, sender, message, created) VALUES ('{${senderid}, ${personid}}', '${sendername}', '${message}', CURRENT_TIMESTAMP);`
    )
    .then(data => null)
    .catch(err => null)
}

messages.getAll= async (user1id, user2id) => {
    return db.many(
        `SELECT * FROM messages WHERE ${user1id} = ANY (usersid) AND ${user2id} = ANY (usersid);`
    )
    .then(data => data)
    .catch(err => null)
}

messages.delete= async (user1id, user2id) => {
    return db.none(
        `DELETE FROM messages WHERE ${user1id} = ANY (usersid) AND ${user2id} = ANY (usersid);`
    )
    .then(data => null)
    .catch(err => null)
}


module.exports = messages;