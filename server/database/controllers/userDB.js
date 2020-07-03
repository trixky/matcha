const db  = require("../database")
const utils = require("../../Model/utils")

const userDB = {};

const userInfo =  "id ,email, username, firstname, name, gender, orientation, " 
                + "biography, birthday, age, tags, profile, picture1, picture2, "
                + "picture3, picture4, liked, likers, match, "
                + "viewers, reputation, latitude, longitude, connected, updated, verified"


// Find one user with the help of the email
// return a array wit the user element
userDB.findOneUserByEmail = async (email) => {
    return  db.oneOrNone(
        "SELECT * FROM users WHERE email = $1", email
        )
    .then(data => {
        if (!data)
            return data
        var update = data.updated;
        data.updated = update.getDate() + "/" + (update.getMonth() + 1) + "/" + update.getFullYear() + " " + update.getHours() + ":" + update.getMinutes();
        return data
    })
    .catch(err => utils.log(err));
}

userDB.findFilter = async (query, arg) =>{
    
    return db.manyOrNone(
        query, arg
    )
    .then(data => data)
    .catch(err => utils.log(err));
}


userDB.findOneUserById = async (id) => {
    return  db.oneOrNone(
        `SELECT ${userInfo} FROM users WHERE id = $1;`, id
        )
    .then(data => {
        if (!data)
            return data
        var update = data.updated;
        data.updated = update.getDate() + "/" + (update.getMonth() + 1) + "/" + update.getFullYear() + " " + update.getHours() + ":" + update.getMinutes();
        return data
    })
    .catch(err => utils.log(err));
  }
  
userDB.findOneUserByUsername = async (username) => {
    return  db.oneOrNone(
        `SELECT ${userInfo} FROM users WHERE username = $1`, [username]
        )
    .then(data => data)
    .catch(err => utils.log(err));
  }

userDB.updateConnection = async (id ,state) =>{
    if (id != null)
    return db.none(
        `UPDATE users SET connected = $1 where  id = $2;`,[state, id]
        )
    .then(data => data)
    .catch(err => utils.log(err))
}

// Only update the password with the id of the user 
userDB.updateOnePasswordById = async (id, password) => {
    return db.none(
        "UPDATE users SET password = $2 WHERE ID = $1", [id, password]
        )
    .then(data => data)
    .catch(err => utils.log(err))
}

userDB.findAll = async () => {
    return db.multi(
        `SELECT ${userInfo} FROM users;`
    )
    .then(data => data)
    .catch(err => utils.log(err));
}

userDB.findArray = async (array) => {
    return db.multi(QueryMultyUser(array))
    .then(data => data)
    .catch(err => utils.log(err));
}

userDB.updatePicture = async (id, pictureName, number) => {
    return userDB.findOneUserById(id)
    .then(data => {
        if(data)        
            deleteFile(number, data)
        
        return db.none(
            `UPDATE users SET picture${number} = 'http://localhost:3002/${pictureName}' WHERE id = $1;`,[id]
        )
        .then(data => null)
        .catch(err => utils.log(err));
    })
    .catch(err => utils.log(err));
}

userDB.updatePictureProfile = async (id, pictureName) => {
    return userDB.findOneUserById(id)
    .then(data => {
        return db.none(
            `UPDATE users SET profile = 'http://localhost:3002/${pictureName}' WHERE id = $1;`, [id]
        )
        .then(data => null)
        .catch(err => utils.log(err));
    })
    .catch(err => utils.log(err));
}

userDB.updateFame = async (userid, number) => {
    return db.none(
        "UPDATE users SET reputation = reputation + $2 WHERE id = $1;", [userid, number]
    )
    .then(data => data)
    .catch(err => utils.log(err));
}

userDB.updateTime = async (id) => {
    db.none(
        "UPDATE users SET updated = CURRENT_TIMESTAMP WHERE id = $1", [id]
    )
    .then(data => data)
    .catch(err => utils.log(err));
}

userDB.disconnect = async (id) => {
    db.none(
        "UPDATE users SET connected = false WHERE id = $1", [id]
    )
    .then(data => data)
    .catch(err => utils.log(err));
}

userDB.deletePicture = async (id, column) => {
    userDB.findOneUserById(id)
    .then(data => deleteFile(column, data))
    .catch(err => err);
    if (column === "profile")
        return db.none(`UPDATE users SET profile = 'http://localhost:3002/profile_$1' WHERE id = $1;`, [id])
            .then(data => data)
            .catch(err => utils.log(err));
    else
        return db.none(`UPDATE users SET picture$1 = '' WHERE id = $2;`, [parseInt(column), id])
            .then(data => data)
            .catch(err => utils.log(err));
}

userDB.updateUser = async (newData) => {
    data = [
        newData.email,
        newData.username,
        newData.firstname,
        newData.name,
        newData.gender,
        newData.orientation,
        newData.biography,
        newData.birthday,
        newData.age,
        newData.tags,
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
                    gender = $5,
                    orientation = $6,
                    biography = $7,
                    birthday = $8,
                    age = $9,
                    tags = $10,
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
    .catch(err => {
        utils.log(err)})
}

//--------------------------------- Function 
// !!!!! protect this 
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

function deleteFile(id, user){
    if (id === "1" && user.picture1)
    utils.removeFile( "public/" + user.picture1.split("http://localhost:3002")[1]);
    else if (id === "2" && user.picture2)
    utils.removeFile("public/" +  user.picture2.split("http://localhost:3002")[1]);
    else if (id === "3" && user.picture3)
    utils.removeFile("public/" + user.picture3.split("http://localhost:3002")[1]);
    else if (id === "4" && user.picture4)
    utils.removeFile("public/" + user.picture4.split("http://localhost:3002")[1]);
    if (id === "profile" && user.profile)
        utils.removeFile("public/" + user.profile.split("http://localhost:3002")[1]);
}

module.exports = userDB;
