const router = require("express").Router();
const userDB = require("../database/controllers/userDB");
const ent = require("ent")
const check = require("../Model/check")
const crypto = require("crypto")
const response = require("../Model/response")
const viewerDB = require("../database/controllers/viewers")
const socketIO = require("../Model/socket")
const filter = require("../Model/filter")
const matchDB = require("../database/controllers/match")
const likedDB  = require("../database/controllers/liked")
const blockedDB = require("../database/controllers/blocked")

router.get("/myProfile", (req, res, next) => {
    
    const userid = req.session.user;
    
    userDB.findOneUserById(userid)
    .then(data => {
        response.response(res, data)})
    .catch(err => response.errorCatch(res, "Something went wrong in account, Error database", err));
})

router.get("/:id", (req, res, next) => {
    
    const id = req.params.id;
    
    if (id > 2147483640 || id < -2147483648)
        return response.response(res, "Number to big");
    userDB.findOneUserById(req.session.user)
    .then(user => {
        
        if (!user)
        return response.response(res, "No user with this username");

        userDB.findOneUserById(id)
        .then(data => {
            if (!data)
                return response.response(res, "No user with this username");

            userDB.updateFame(data.id, 1);
            socketIO.notification(data.id, req.session.username + " have look at your profile, check back");
            viewerDB.create(req.session.user, req.session.username, data)
            data.distance = filter.findDistance(user, data)

            matchDB.getById(user.id, data.id)
            .then(matched => {
                if (matched){
                    data.relation = "matched";
                    return response.response(res, data)
                }
                likedDB.findOneLikeById(user.id, data.id)
                .then(liked => {
                    if (liked){
                        data.relation = "liked";
                        return response.response(res, data)
                    }
                    blockedDB.get(user.id, data.id)
                    .then(blocked => {
                        if (blocked){
                            data.relation = "blocked";
                            return response.response(res, data)
                        }
                        return response.response(res, data)
                    })
                })
            })
            .catch(err => response.errorCatch(res, "Something went wrong in account, Error database", err));
        })
        .catch(err => response.errorCatch(res, "Something went wrong in account, Error database", err));
    })
    .catch(err => response.errorCatch(res, "Something went wrong in account, Error database", err));
    
})

router.put("/password", (req, res, next) => {
    
    if (!req.body.user)
        return response.errorResponse(res, "You didn't put a body");

    var user = req.body.user;

    var err = check.password(user)

    if (err)
        return response.errorResponse(res, err)

    user.password = crypto.createHash('sha256')
                .update(user.password)
                .digest('hex');

    userDB.updateOnePasswordById(req.session.user, user.password)
    .then(data => response.response(res, "Password updated"))
    .catch(err => response.errorCatch(res, "Something went wrong in update password, Error database", err));
                
})

router.put("/myprofile", (req, res, next) => {

    if ( !req.body.user)
        return response.errorResponse(res, "You didn't put a body");

    var user = req.body.user;

    if (user.email)
        userDB.findOneUserByEmail(user.email)
        .then(data => {
                if (data)
                    return response.errorResponse(res, "This email is already taked");
                return updateData(req, res, user)
            })
        .catch(err => {
            console.log(err)
            err
        })
        .catch(err => response.errorCatch(res, "Something went wrong in account, Error database in finding email", err));
    else
        updateData(req, res, user)
})

function updateData(req, res, user){
            
    user = encodeUserData(user)    
    
    var error = check.userProfile(user)
    error = retError(error)
    if(error != "")
    // if (Object.entries(error).length)
        return response.errorResponse(res, error)

    const userid = req.session.user;

    userDB.findOneUserById(userid)
        .then(data => {
            
            var newData = changeValue(data, user)
            
            userDB.updateUser(newData)
            .then(data =>
                userDB.findOneUserById(userid)
                .then(data => {
                    response.response(res, data)})
                .catch(err => response.errorCatch(res, "Something went wrong in account, Error database 1", err))
            )
            .catch(err => response.errorCatch(res, "Something went wrongin account, Error database 2", err));
        })
        .catch(err => {
            console.log(err)
            response.errorCatch(res, "Something went wrong in account, Error database 3", err)});
}

function retError(err){

    var returnError = ""

    for(let [key, value] of Object.entries(err))
    {
        if(returnError != "")
            returnError += ", ";     
        returnError += value; 
    }   
    return returnError
}

function encodeUserData(user){

    user.email ? user.email = ent.encode(user.email) : 0;
    user.username ? user.username = ent.encode(user.username): 0;
    user.firstname ? user.firstname = ent.encode(user.firstname) : 0; 
    user.name ?  user.name = ent.encode(user.name) : 0; 
    user.biography ? user.biography = ent.encode(user.biography) : 0 ;
    return user;
}

function changeValue(data, newData){
    
    if (newData.email)
        data.email = newData.email;
    if (newData.username)
        data.username = newData.username;
    if (newData.firstname)
        data.firstname = newData.firstname
    if (newData.name)
        data.name = newData.name;
    if (newData.gender)
        data.gender = newData.gender
    if (newData.orientation)
        data.orientation = newData.orientation
    if (newData.biography)
        data.biography = newData.biography
    if (newData.birthday)
    {
            data.birthday = newData.birthday;
            data.age = formatAge(newData.birthday)
    }
    if (newData.latitude)
        data.latitude = newData.latitude
    if (newData.longitude)
        data.longitude = newData.longitude
    if (newData.tags)
        data.tags = newData.tags
    return data;
}

function formatAge(birthday){
  
    var dob = new Date(birthday);
    var today = new Date();
    var age = today.getFullYear() - dob.getFullYear();
    var m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDay() < birthday.getDay()))
        age--;
    
    return age;
}

module.exports = router;