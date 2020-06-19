const db  = require("../database")

const userDB = {};

// Find one user with the help of the email
// return a array wit the user element
userDB.findOneUserIdByEmail = async (email) => {
    return  db.one("SELECT * FROM users WHERE email = $1", email)
    .then(data => data)
    .catch(err => null)
  }

// Only update the password with the id of the user 
userDB.updateOnePasswordById = async (id, password) => {
    return db.none("UPDATE users SET password = $2 WHERE ID = $1", [id, password])
    .catch(err => null)
}

userDB.updateUser = async (newData) => {
    return  db.none(`UPDATE users 
                    SET 
                        email = '${newData.email}',
                        username = '${newData.username}',
                        firstname = '${newData.firstname}',
                        lastname = '${newData.lastname}',
                        password = '${newData.password}',
                        verified = '${newData.verified}'
                    WHERE ID = ${newData.id};`
            )
    .catch(err => null)
}

module.exports = userDB;
