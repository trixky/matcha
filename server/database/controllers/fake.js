const db = require("../database")
const utils = require("../../Model/utils")

const fakeDB = {}

fakeDB.create = async (faker) => {
    return db.none(
        "INSERT INTO fake (fakerid) VALUES ($1);", faker.id
    )
    .then(data => data)
    .catch(err => utils.log(err))
}

fakeDB.findById = async (faker) => {
    return db.oneOrNone(
        "SELECT * FROM fake WHERE fakerid = $1;", faker.id
    )
    .then(data => data)
    .catch(err => utils.log(err))
}

module.exports = fakeDB;