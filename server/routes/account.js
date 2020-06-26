const router = require("express").Router();
const userDB = require("../database/controllers/userDB");
const ent = require("ent")
const check = require("../Model/check")
const crypto = require("crypto")
const response = require("../Model/response")
const viewerDB = require("../database/controllers/viewers")
const socketIO = require("../Model/socket")

router.get("/myProfile", (req, res, next) => {
  
    if (!checkHaveId(req, res))
        return;
    
    const userid = req.session.user;
    
    userDB.findOneUserById(userid)
    .then(data => {
        data.password = ""
        response.response(res, data)})
    .catch(err => response.errorCatch(res, "Something went wrong in account, Error database", err));
})

router.get("/", (req, res, next) => {
    
    const username = req.body.user.username;
    
    userDB.findOneUserByUsername(username)
    .then(data => {
        if (!data)
            return response.response(res, "No user with this username");
        viewerDB.create(req.session.user, req.session.username, data)
        socketIO.notification(data.id, req.session.username + " have look at your profile, check back");
        response.response(res, data)})
    .catch(err => response.errorCatch(res, "Something went wrong in account, Error database", err));
})

router.put("/password", (req, res, next) => {

    if (!checkHaveId(req, res))
        return;
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
    
    if (!checkHaveId(req, res))
        return;

    var user = req.body.user;
    
    if (user.email)
        userDB.findOneUserByEmail(user.email)
        .then(data => {
                if (data)
                    return response.errorResponse(res, "This email is already taked");
                return updateData(req, res, user)
            })
        .catch(err => response.errorCatch(res, "Something went wrong in account, Error database in finding email", err));
    else if (user.username)
        userDB.findOneUserByUsername(user.username)
        .then(data => {        
            if (data)
             return response.errorResponse(res, {username: "Username already taken"})
            updateData(req, res, user)
        })
        .catch(err => response.errorCatch(res, "Something went wrong in account, Error database in finding username", err));
    else
        updateData(req, res, user)
})

function updateData(req, res, user){
            
    user = encodeUserData(user)    
    
    const error = check.userProfile(user)

    if (Object.entries(error).length)
        return response.errorResponse(res, error)

    const userid = req.session.user;

    userDB.findOneUserById(userid)
        .then(data => {
            var newData = changeValue(data, user)
            userDB.updateUser(newData)
            .then(data =>
                userDB.findOneUserById(userid)
                .then(data => {
                    data.password = ""
                    response.response(res, data)})
                .catch(err => response.errorCatch(res, "Something went wrong in account, Error database", err))
            )
            .catch(err => response.errorCatch(res, "Something went wrongin account, Error database", err));
        })
        .catch(err => response.errorCatch(res, "Something went wrong in account, Error database", err));
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
    if (newData.tags)
        data.tags = newData.tags
    return data;
}

function checkHaveId(req, res){
    if (req.session.user === undefined)
    {
        response.errorResponse(res, "Something went wrong in account, You don't have a session");
        return false;
    }
    return true;
}

module.exports = router;