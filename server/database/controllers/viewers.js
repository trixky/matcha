const db  = require("../database")
const utils = require("../../Model/utils")

const viewers = {}

viewers.create = async (userid, username, person) => {
    
    return db.none(
        `INSERT INTO viewers (viewerid, personid, viewerusername, personusername) VALUES ($1, $2, $3, $4);`,[userid, person.id, username, person.username]
    )
    .then(data => null)
    .catch(err => utils.log(err));
}

viewers.getView = async (userid) => {
    
    return db.manyOrNone(
        `SELECT * FROM viewers WHERE $1 = (viewerid);`,[userid]
    )
    .then(data => data)
    .catch(err => utils.log(err));
}

viewers.CheckView = async (userid, personid) => {
    return db.oneOrNone(
        `SELECT * FROM viewers WHERE $1 = (viewerid) AND $2 = (personid);`,[userid, personid]
    )
    .then(data => data)
    .catch(err => utils.log(err));
}

viewers.getViewers = async (userid) => {
    return db.manyOrNone(
        `SELECT * FROM viewers WHERE $1 = (personid);`,[userid]
    )
    .then(data => data)
    .catch(err => utils.log(err));
}

viewers.delete = async (userid, viewersid) => {
    
    return db.none(
        `DELETE FROM viewers WHERE $1 = (userid) AND $2 = (personid);`,[userid, viewersid]
    )
    .then(data => null)
    .catch(err => utils.log(err));
}

module.exports = viewers