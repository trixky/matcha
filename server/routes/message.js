const router = require("express").Router()
const messagesDB = require("../database/controllers/messages")
const userDB = require("../database/controllers/userDB")
const response = require("../Model/response")
const socketIo = require("../Model/socket")
const ent = require("ent")
const blockedDB = require("../database/controllers/blocked")

router.post("/", (req, res, next)=>{
    
    if(!req.body.user.username || !req.body.user.message)
        return response.errorResponse(res, "You didn't give a username or a message")
    
    if(req.body.user.message.length > 300)
        return response.errorResponse(res, "Message to long , it should be < 300 caractere")
        
    const receiverUsername = req.body.user.username;
    const message = ent.encode(req.body.user.message);

    userDB.findOneUserByUsername(receiverUsername)    
    .then(data => {
        
        if (!data)
            return response.errorResponse(res, "No user with this username");

        var receiverData = data;

        blockedDB.isBlocked(req.session.user, data.id)
        .then(data => {
        
            if (data)
                return response.errorResponse(res, "You are blocked");
        
            messagesDB.create(req.session.user, receiverData.id, req.session.username, message)
            .then(data => {
                socketIo.messages(receiverData.id, req.session.username, message)
                response.response(res, "Message created");
            })
            .catch(err => response.errorCatch(res, "Something went wrong in POST message router ", err))
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