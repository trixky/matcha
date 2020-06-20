const db  = require("../database")

const userDB = {};

function prepareQuery(arrayid){
    var query = "SELECT id, username, picture FROM users WHERE ";
    
    for (var i= 0; i < arrayid.length; i++)
    {
        query += `id = ${arrayid[i]} `
        if (i != arrayid.length - 1)
            query += ` OR `
        else
            query += `;`
    }
    
    return query;
}

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

userDB.findAll = async () => {
    return db.multi("SELECT * FROM users;")
    .then(data => data)
    .catch(err => null)
}

userDB.findArray = async (array) => {
    const a = prepareQuery(array);
    console.log(a)
    return db.multi(prepareQuery(array))
    .then(data => data)
    .catch(err => null)
}


userDB.updateUser = async (newData) => {
    data = [
        newData.email,
        newData.username,
        newData.firstname,
        newData.lastname,
        newData.password,
        newData.verified,
        newData.id
    ]
    return  db.none(`UPDATE users 
                SET 
                    email = $1,
                    username = $2,
                    firstname = $3,
                    lastname = $4,
                    password = $5,
                    verified = $6
                WHERE ID = $7`,
                data
        )
    .catch(err => null)
}

module.exports = userDB;
