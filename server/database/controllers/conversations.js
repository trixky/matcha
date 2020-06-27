const db = require('../database')
const utils = require("../../Model/utils")

const conversations = {}

conversations.getAll = async (id) =>{
    return db.manyOrNone(
        "SELECT * FROM conversations WHERE $1 = ANY (usersid) ORDER BY updated DESC;",[id]
    )
    .then(data => data)
    .catch(err => utils.log(err));
}

module.exports = conversations;