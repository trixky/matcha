const router = require("express").Router();
const userDB = require("../database/controllers/userDB")
const response = require("../Model/response")
const likedDB = require("../database/controllers/liked")
const socket = require("../Model/socket")
const utils = require("../Model/utils")
const matchDB = require("../database/controllers/match")
const socketIo = require("../Model/socket")
const blockedDB = require("../database/controllers/blocked")
const file = require('../Model/file')
const filter = require("../Model/filter")

router.post("/", (req, res, next) => {
    
    if ( !req.body.user || !req.body.user.username)
        return response.errorResponse(res, "You didn't put a body");

    if (!file.CheckProfilePicture(req.session.user))
        return response.errorResponse(res, "You don't have a profile picture , update one to start using this feature")
        
    if (req.session.user === req.body.user.username)
        return response.errorResponse(res, "you cannot like yourself")      

    userDB.findOneUserByUsername(req.body.user.username)
    .then(data => {
        if (!data)
            return response.errorResponse(res, "No use with this username in the database")     
        
        var likedData = data;
        
        userDB.findOneUserById(req.session.user)
        .then(data => {
        
        var likerData = data

        blockedDB.isBlocked(req.session.user, likedData.id)
        .then(data => {    
            
            if (data)
                return response.errorResponse(res, "You are blocked");

                likedDB.findOneLikeById(likerData.id, likedData.id)
                .then(data => {

                    if(!data)
                        return likedDB.create(likerData, likedData)
                        .then(data => {
                        
                            response.response(res, "You liked this person");
                            socket.notification(likedData.id, "You just got a new liker")
                            userDB.updateFame(likedData.id, 2);                        
                            matchDB.checkAndCreate(likerData,likedData)
                            .then(data => {
                                if (data)
                                    socketIo.matchNotification(likerData.id, likedData.id)
                            })
                            .catch(err => utils.log(err))
                        })
                        .catch(err => response.errorCatch(res, "Something wrong in the liked router 1", err))

                    response.errorResponse(res, "You already like this personne")
                })
                .catch(err => response.errorCatch(res, "Something wrong in the liked router 2", err))
            })
            .catch(err => response.errorCatch(res, "Something wrong in the liked router 3", err))
        })
        .catch(err => response.errorCatch(res, "Something wrong in the liked router 4", err))
    })
    .catch(err => response.errorCatch(res, "Something wrong in the liked router 5", err))
})

router.put("/",(req, res, next) => {

    if ( !req.body.user || !req.body.user.username)
        return response.errorResponse(res, "You didn't put a body");

    if (!file.CheckProfilePicture(req.session.user))
        return response.errorResponse(res, "You don't have a profile picture , update one to start using this feature")      
    
    userDB.findOneUserByUsername(req.body.user.username)
    .then(data => {
        if (!data)
            return response.errorResponse(res, "No user with this name")

        userDB.updateFame(data.id, -1)
        socket.notification(data.id, "Someone unliked you, check for new love")
        matchDB.delete(req.session.user, data.id)
        likedDB.delete(req.session.user, data.id)
        .then(data => response.response(res, "Like delected"))
        .catch(err => response.errorCatch(res, "Something wrong in the liked router 2", err))
    })
    .catch(err => response.errorCatch(res, "Something wrong in delete 3", err))
})

router.get("/likers", (req, res, next) =>{
    
    likedDB.getAlllikers(req.session.user)
    .then(data => {
        if(!data)
            return response.response(res, [])
        var array = [];
        for (key in data)
            array[key] = data[key].likerid;
        filter.getByArrayProfile(req.session.user, array, res)
    })
    .catch(err => response.errorCatch(res, "Something wrong in likers", err))
})

router.get("/", (req, res, next) =>{
    
    likedDB.getAllLiked(req.session.user)
    .then(data => {
        if(!data)
            return response.response(res, [])
        var array = [];
        for (key in data)
            array[key] = data[key].likedid;
        filter.getByArrayProfile(req.session.user, array, res)
    })
    .catch(err => response.errorCatch(res, "Something wrong in liked", err))
})

module.exports = router;