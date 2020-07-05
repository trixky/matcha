const router = require("express").Router()
const messagesDB = require("../database/controllers/messages")
const userDB = require("../database/controllers/userDB")
const response = require("../Model/response")
const socketIo = require("../Model/socket")
const ent = require("ent")
const blockedDB = require("../database/controllers/blocked")
const matchDB = require("../database/controllers/match")
const utils = require("../Model/utils")

router.post("/", (req, res, next)=>{
    
    if(!req.body.user || !req.body.user.username || !req.body.user.message || typeof(req.body.user.message) != "string")
        return response.errorResponse(res, "You didn't give a username or a message or parametter not well formated")
    
    if(req.body.user.message.length > 300)
        return response.errorResponse(res, "Message to long , it should be < 300 caractere")
        
    const receiverUsername = req.body.user.username;
    const message = ent.encode(req.body.user.message);

    userDB.findOneUserByUsername(receiverUsername)    
    .then(data => {
        if (!data)
            return response.errorResponse(res, "No user with this username");
        var receiverData = data;
        matchDB.getById(receiverData.id, req.session.user)
        .then(data => {
            if (!data)
                return response.errorResponse(res, "You are not matched with this personne");
            blockedDB.isBlocked(req.session.user, receiverData.id)
                .then(data => {
            
                    if (data)
                        return response.errorResponse(res, "You are blocked");
            
                    messagesDB.create(req.session.user, receiverData.id, req.session.username, message)
                    .then(data => {
                        socketIo.messages(receiverData.id, req.session.username, message)
                        response.response(res, "Message created");
                    })
                    .catch(err => response.errorCatch(res, "Something went wrong in POST message router 1", err))
                })
                .catch(err => response.errorCatch(res, "Something went wrong in POST message router 2", err))
        })
        .catch(err => response.errorCatch(res, "Something went wrong in POST message router 3", err))
    })
    .catch(err => response.errorCatch(res, "Something went wrong in POST message router 4", err))
})

router.get("/:username",(req, res, next) =>{
    
    if(!req.params.username)
        return response.errorResponse(res, "You didn't give a username")

    userDB.findOneUserByUsername(req.params.username)    
    .then(data => {
        
        if (!data)
            return response.errorResponse(res, "No user with this username");

        messagesDB.getAll(req.session.user, data.id)
        .then(data => {
            if(data){
                return response.response(res, data)
            }
            response.response(res, [])
        })
        .catch(err => response.errorCatch(res, "Something went wrong in GET message router ", err))
    })
    .catch(err => response.errorCatch(res, "Something went wrong in GET message router ", err))
})

module.exports = router;