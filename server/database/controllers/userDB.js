const db  = require("../database")

const userDB = {};

// Find one user with the help of the email
userDB.findOneUserIdByEmail = async (email) => {
    return  db.one("SELECT (id, username) FROM users WHERE email = $1", email)
    .catch(err => null)
  }

// Only update the password with the id of the user 
userDB.updateOnePasswordById = async (id, password) => {
    return db.none("UPDATE users SET password = $2 WHERE ID = $1", [id, password])
    .then(data => data)
    .catch(err => null)
}

module.exports = userDB;
