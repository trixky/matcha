const router = require("express").Router()
const messagesDB = require("../database/controllers/messages")
const userDB = require("../database/controllers/userDB")
const response = require("../Model/response")
const socketIo = require("../Model/socket")
const ent = require("ent")

router.post("/", (req, res, next)=>{
    if(!req.body.user.username || !req.body.user.message)
        return response.errorResponse(res, "You didn't give a username or a message")
    userDB.findOneUserByUsername(req.body.user.username)    
    .then(data => {
        if (!data)
            return response.errorResponse(res, "No user with this username");
        receiverData = data;
        messagesDB.create(req.session.user, data.id, req.session.username, ent.encode(req.body.user.message))
        .then(data => {
            socketIo.notification(receiverData.id, "You got a new message from " + req.session.username)
            response.response(res, "Message created");
        })
        .catch(err => response.errorCatch(res, "Something went wrong in POST message router ", err))
    })
    .catch(err => response.errorCatch(res, "Something went wrong in POST message router ", err))
})

router.get("/",(req, res, next) =>{
    
    if(!req.body.user.username)
        return response.errorResponse(res, "You didn't give a username")

    userDB.findOneUserByUsername(req.body.user.username)    
    .then(data => {
        
        if (!data)
            return response.errorResponse(res, "No user with this username");

        messagesDB.getAll(req.session.user, data.id)
        .then(data => response.response(res, data))
        .catch(err => response.errorCatch(res, "Something went wrong in GET message router ", err))
    })
    .catch(err => response.errorCatch(res, "Something went wrong in GET message router ", err))
})

module.exports = router;