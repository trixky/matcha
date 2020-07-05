const db = require("../database")
const utils = require("../../Model/utils")

const notifications = {}

notifications.Create = async (id, notification) => {
    const time = utils.getDate()
    return db.none(
        "INSERT INTO notifications (userid, notification) VALUES ($1, $2);", [id, notification]
    )
    .then(data => data)
    .catch(err => utils.log(err))
}

notifications.findAllById = async (id) => {
    return db.manyOrNone(
        "SELECT * FROM notifications WHERE userid = $1 ORDER BY created DESC;", id
    )
    .then(data => {
        db.none(
            "UPDATE notifications SET read = true WHERE userid = $1 AND read = false;", id
        )
        .then(data => data)
        .catch(err => utils.log(err))
        return data
    })
    .catch(err => utils.log(err))
}

module.exports = notifications;