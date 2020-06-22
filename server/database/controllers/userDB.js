const db  = require("../database")

const userDB = {};
const userInfo =  "username, firstname, name, gender, orientation, " 
                + "biography, tags, pictures, liked, likers, match, "
                + "viewers, reputation, latitude, longitude, connected "

function QueryMultyUser(arrayid){
    var query = "SELECT id, username, pictures FROM users WHERE ";
    
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
    .then(data => {
        data.password = "";
        return data})
    .catch(err => err)
  }

// Only update the password with the id of the user 
userDB.updateOnePasswordById = async (id, password) => {
    return db.none("UPDATE users SET password = $2 WHERE ID = $1", [id, password])
    .catch(err => err)
}

userDB.findAll = async () => {
    return db.multi(`SELECT ${userInfo} FROM users;`)
    .then(data => data)
    .catch(err => err)
}

userDB.findArray = async (array) => {
    return db.multi(QueryMultyUser(array))
    .then(data => data)
    .catch(err => err)
}

userDB.updatePicture = async (id, pictureName) => {
    return userDB.findOneUserById(id)
    .then(data => {
        if (data.picture.length >= 5)
            return false;
        var picture = data.picture;
    
        picture.push(pictureName)
        return db.none(`UPDATE users SET picture = '{${picture}}' WHERE id = ${id};`)
        .then(data => true)
        .catch(err => console.log(err))
    })
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
        newData.orientation,
        newData.biography,
        newData.tags,
        newData.pictures,
        newData.liked,
        newData.likers,
        newData.viewers,
        newData.reputation,
        newData.latitude,
        newData.longitude,
        newData.connected,
        newData.verified,
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
                    orientation = $7,
                    biography = $8,
                    tags = $9,
                    pictures = $10,
                    liked = $11,
                    likers = $12,
                    viewers = $13,
                    reputation = $14,
                    latitude = $15,
                    longitude = $16,
                    connected = $17,
                    verified = $18
                WHERE ID = $19`,
                data
        )
    .catch(err => null)
}

module.exports = userDB;
