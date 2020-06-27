const userDB = require("../database/controllers/userDB")
const utils = require("./utils")


const filter = {}

var userInfo =  "id ,email, username, firstname, name, gender, orientation, " 
                + "biography, birthday, age, tags, profile, picture1, picture2, "
                + "picture3, picture4, liked, likers, match, "
                + "viewers, reputation, latitude, longitude, connected, verified"


filter.prepareQuery = (tags) => {
    

    var query = `SELECT ${userInfo} FROM users WHERE `
                + "age >= $1 AND age <= $2 "
                + "AND reputation >= $3 AND reputation <= $4 "

    var i = 5;
    
    if (Array.isArray(tags))
        tags.forEach((e) => {
            query += `AND $${i++} = ANY (tags) `;
        })
    query += ";"
    return query;
}

filter.checkEntry = (ageMin , ageMax, repuMin, repuMax, tags) =>{
    if (!Number.isInteger(ageMin) 
    || !Number.isInteger(ageMax)
    || !Number.isInteger(repuMin)
    || !Number.isInteger(repuMax)
    )
        return false
    return true
}

filter.formatEntry = (ageMin , ageMax, repuMin, repuMax, tags) =>{
    return [ageMin, ageMax, repuMin, repuMax, tags];
}

filter.usersFilter = async (ageMin , ageMax, repuMin, repuMax, tags) => {
    if (!ageMin)
        ageMin = 0;
    if (!ageMax)
        ageMax = 999;
    if (!repuMin)
        repuMin = 0;
    if (!repuMax)
        repuMax = 999;
        
    return userDB.findFilter(filter.prepareQuery(tags), [ageMin, ageMax, repuMin, repuMax, tags])
    .then(data => data)
    .catch(err => console.log(err));
}

module.exports = filter