const router = require("express").Router();
const userDB = require("../database/controllers/userDB");
const ent = require("ent")
const check = require("../Model/check")
const crypto = require("crypto")

router.get("/", (req, res, next) => {
  
    if (checkHaveId(req, res))
        return;
    
    const userid = req.session.user;
    
    userDB.findOneUserById(userid)
    .then(data => Response(res, data))
    .catch(err => errorResponse(res, {error: "Something went wrong"}));
})

router.put("/", (req, res, next) => {
    
    if (checkHaveId(req, res))
        return;

    var user = req.body.user;

    if (user.email)
        userDB.findOneUserByEmail(user.email)
        .then(data => {
                if (data.email)
                    return errorResponse(res, {email: "This email is already taked"});
                return updateData(req, res, user)
            })
        .catch(err => errorResponse(res, {error: "Something went wrong"}));
    else
        updateData(req, res, user)
})

function updateData(req, res, user){
            
    user = encodeUserData(user)    
            
    const error = check.userProfile(user)

    if (Object.entries(error).length)
        return errorResponse(res, error)

    const userid = req.session.user;

    userDB.findOneUserById(userid)
        .then(data => {
            var newData = changeValue(data, user)
            userDB.updateUser(newData)
            .then(data =>
                userDB.findOneUserById(userid)
                .then(data => Response(res, data))
                .catch(err => errorResponse(res, {error: "Something went wrong"}))
            )
            .catch(err => errorResponse(res, {error: "Something went wrong"}));
        })
        .catch(err => errorResponse(res, {error: "Something went wrong"}));
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
    if (newData.password)
        data.password = crypto.createHash('sha256')
                    .update(newData.password)
                    .digest('hex');
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

function errorResponse(res,  data)
{
    return res.json({
        _status: -1,
        _data: data
    })
}

function Response(res,  data)
{
    return res.json({
        _status: 0,
        _data: data
    })
}

function checkHaveId(req, res){
    if (!req.session.user)
    {
        errorResponse(res, {error: "Something went wrong"});
        return true;
    }
    return false;
}

module.exports = router;