const db  = require("../database")

const userDB = {};

function QueryMultyUser(arrayid){
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
userDB.findOneUserByEmail = async (email) => {
    return  db.one("SELECT * FROM users WHERE email = $1", email)
    .then(data => data)
    .catch(err => err)
  }

userDB.findOneUserById = async (id) => {
    return  db.one("SELECT * FROM users WHERE id = $1", id)
    .then(data => data)
    .catch(err => err)
  }

// Only update the password with the id of the user 
userDB.updateOnePasswordById = async (id, password) => {
    return db.none("UPDATE users SET password = $2 WHERE ID = $1", [id, password])
    .catch(err => err)
}

userDB.findAll = async () => {
    return db.multi("SELECT * FROM users;")
    .then(data => data)
    .catch(err => err)
}

userDB.findArray = async (array) => {
    const a = prepareQuery(array);
    console.log(a)
    return db.multi(QueryMultyUser(array))
    .then(data => data)
    .catch(err => err)
}


userDB.updateUser = async (newData) => {
    data = [
        newData.email,
        newData.username,
        newData.firstname,
        newData.name,
        newData.password,
        newData.gender,
        newData.sexualpref,
        newData.biography,
        newData.tag,
        newData.picture,
        newData.haveliked,
        newData.beenliked,
        newData.looked,
        newData.fame,
        newData.latitude,
        newData.longitude,
        newData.connected,
        newData.id
    ]
    return  db.none(`UPDATE users 
                SET 
                    email = $1,
                    username = $2,
                    firstname = $3,
                    name = $4,
                    password = $5,
                    gender = $6,
                    sexualpref = $7,
                    biography = $8,
                    tag = $9,
                    picture = $10,
                    haveliked = $11,
                    beenliked = $12,
                    looked = $13,
                    fame = $14,
                    latitude = $15,
                    longitude = $16,
                    connected = $17
                WHERE ID = $18`,
                data
        )
    .catch(err => null)
}

module.exports = userDB;
