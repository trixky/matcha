const db = require("../database")
const utils = require("../../Model/utils")

const notifications = {}

notifications.Create = async (id, notification) => {
    return db.none(
        "INSERT INTO notifications (userid, notification) VALUES ($1, $2);", [id, notification]
    )
    .then(data => data)
    .catch(err => utils.log(err))
}

notifications.findAllById = async (id) => {
    return db.manyOrNone(
        "SELECT * FROM notifications WHERE userid = $1;", id
    )
    .then(data => data)
    .catch(err => utils.log(err))
}



module.exports = notifications;