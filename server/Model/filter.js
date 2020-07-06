const userDB = require("../database/controllers/userDB")
const utils = require("./utils")
const blockedDB = require("../database/controllers/blocked")
const likedDB = require("../database/controllers/liked")
const response = require("../Model/response")

const filter = {}

var userInfo =  "id ,email, username, firstname, name, gender, orientation, "
                + "birthday, age, tags, profile, picture1, picture2, "
                + "picture3, picture4, liked, likers, match, "
                + "viewers, reputation, latitude, longitude, connected, updated, verified"


filter.prepareQuery = (tags, gender) => {

    var query = `SELECT ${userInfo} FROM users WHERE `
                + "id != $1 "
                + "AND age >= $2 AND age <= $3 "
                + "AND reputation >= $4 AND reputation <= $5 "

    var i = 6;
    if (gender){
        query += "AND gender = $6 "
        i = 7
    }
    if (Array.isArray(tags))
        tags.forEach((e) => {
            query += `AND $${i++} = ANY (tags) `;
        })
    query += ";"
        
    return query;
}

filter.prepareQueryProfile = (array) => {

    var query = `SELECT ${userInfo} FROM users WHERE `

    var i = 1;
    
    if (Array.isArray(array))
    {       
        for(var j = 0; j < array.length ; j++)
        {
            if (i == 1)
                  query += `id = $${i++} `;
             else
                 query += `OR id = $${i++} `;
        } 
    }
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

filter.usersFilter = async (id, ageMin , ageMax, repuMin, repuMax, gender, tags) => {

    const array = []

    if (!ageMin)
        ageMin = 0;
    if (!ageMax)
        ageMax = 999;
    if (!repuMin)
        repuMin = 0;
    if (!repuMax)
        repuMax = 999;
    array.push(id);array.push(ageMin);array.push(ageMax);array.push(repuMin);array.push(repuMax)

    if(gender)
        array.push(gender)

    if(tags)
        for(var i = 0; i < tags.length; i++)
            array.push(tags[i])
    
    return userDB.findFilter(filter.prepareQuery(tags, gender), array)
    .then(data => data)
    .catch(err => err);
}

filter.filterBlocked = async (user, data) =>{
    return blockedDB.getAll(user.id)
    .then(blocked => {

        if (!blocked)
            return data

        var hash = []

        for(var i = 0; i < blocked.length; i++)
        {
            hash[blocked[i].blockedid] = true;
        }
        for(var i = 0; i < data.length; i++)
        {
            if (data[i].id && hash[data[i].id])
                data[i] = null;
        }
        return data;
    })
    .catch(err => utils.log(err))
}

filter.filterLiked = async (user, data) =>{
    return likedDB.getAllLiked(user.id)
    .then(liked => {
        if (!liked)
            return data
        
        var hash = []

        for(var i = 0; i < liked.length; i++)
            hash[liked[i].likedid] = true;
        for(var i = 0; i < data.length; i++)
        {
            if (data[i] && hash[data[i].id])
            {
                data[i] = null;
            }
        }
        return data;
    })
    .catch(err => utils.log(err))
}

filter.findDistance = (user1, user2) => {
    var lat1 = user1.latitude
    var lat2 = user2.latitude
    var lon2 = user2.longitude
    var lon1 = user1.longitude

    const R = 6371e3;

    const o1 = lat1 * Math.PI/180;
    const o2 = lat1 * Math.PI/180;
    const d1 = (lat2 - lat1) * Math.PI/180;
    const d2 = (lon2 - lon1) * Math.PI/180;
    const a = Math.sin(d1/2) * Math.sin(d1/2) +
            Math.cos(o1) * Math.cos(o2) *
            Math.sin(d2/2) * Math.sin(d2/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c / 1000;

    return (parseInt(d))
}

filter.filterGps = (data, distanceMax) => {

    if (!Array.isArray(data) || !distanceMax)
         return data

     for(var i = 0; i < data.length; i++){
         if (data[i] && (data[i].distance > distanceMax))
            data[i] = null;
     }
     return data;
}

filter.sameTags = (user1, user2) =>{

    if (!user2 || !Array.isArray(user1.tags) || !Array.isArray(user2.tags))
        return 0;

    var nb = 0;

    user1.tags.forEach(e => {

        if (user2.tags.indexOf(e) != -1)
            nb++;
    })
    return nb;
}

filter.market = (user, data) => {

    if (!Array.isArray(data))
        return data;

    for(var i = 0; i < data.length; i++)
    {
        if (!data[i])
            continue;
        data[i].distance = filter.findDistance(user, data[i]);
        data[i].commonTags = filter.sameTags(user, data[i]);
    }
    return data;
}

filter.sort = async (user, data) => {
    
    if (!Array.isArray(data))
        return data;

    data = filter.market(user, data)

    for(var i = 0; i < data.length -1 ; i++)
    {
        if (data[i].distance > data[i + 1].distance)
        {
            data = swap(data, i, i + 1)
            i = -1;
        }
        else if (data[i].distance === data[i + 1].distance)
        {
            if (data[i].commonTags < data[i + 1].commonTags)
            {
                    data = swap(data, i, i + 1)
                    i = -1;
            }
            else if (data[i].commonTags === data[i + 1].commonTags)
            {
                    if (data[i].reputation  < data[i + 1].reputation)
                    {
                        data = swap(data, i, i + 1)
                        i = -1;
                    }
            }
        }
    }
    return filter.filterBlocked(user, data)
    .then(data => {
        return filter.filterLiked(user, data)
        .then(data => {
            return data})
        .catch(err => err);
    })
    .catch(err => err);
}

filter.getProfile = async (user, res)=>{
    filter.usersFilter(user.id)
    .then(data => {
        filter.sort(user, data)
        .then(data => {
            if(data)
                return response.response(res, data)
            response.response(res, [])
        })
        .catch(err => response.errorCatch(res, "Something went wrong in search, Error database 1", err))
    })
    .catch(err => response.errorCatch(res, "Something went wrong in search, Error database 1", err));
}

filter.getByArrayProfile = async (userid, array, res) => {
    if (array.length === 0)
        return response.response(res, array)
    userDB.findOneUserById(userid)
    .then(user => {
        userDB.findFilter(
            filter.prepareQueryProfile(array), array)
        .then(data => 
        {
            if(data)
            {
                data = filter.market(user, data)
                return response.response(res, data)
            }
            response.response(res, [])
        })
        .catch(err => response.errorCatch(res, "Something went wrong in filter, Error  1", err))
    })
    .catch(err => response.errorCatch(res, "Something went wrong in filter, Error 2", err));
}

function swap(data, posi_1, posi_2)
{
    var tmp;

    tmp =  data[posi_1];
    data[posi_1] =  data[posi_2];
    data[posi_2] = tmp;

    return data;
}

module.exports = filter