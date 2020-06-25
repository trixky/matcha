const router = require("express").Router();
const userDB = require("../database/controllers/userDB")
const response = require("../Model/response")
const likedDB = require("../database/controllers/liked")
const socket = require("../Model/socket")
const utils = require("../Model/utils")
const matchDB = require("../database/controllers/match")
const socketIo = require("../Model/socket")

router.post("/", (req, res, next) => {

    userDB.findOneUserByUsername(req.body.user.username)
    .then(data => {
        if (!data)
            return response.errorResponse(res, "No use with this username in the database")     
        
        var likedData = data;
        
        userDB.findOneUserById(req.session.user)
        .then(data => {
            
            var likerData = data
            
            likedDB.findOneLikeById(likerData.id, likedData.id)
            .then(data => {
                if(!data)
                    return likedDB.create(likerData, likedData)
                    .then(data => {
                        
                        response.response(res, "You liked this person");
                        socket.notification(likedData.id, "You just got a new liker")
                        
                        matchDB.checkAndCreate(likerData,likedData)
                        .then(data => {
                            if (data){
                                socketIo.matchNotification(likerData.id, likedData.id)
                                        // console.log("create a match ")
                            }
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

router.put("/",(req, res, next) => {
    userDB.findOneUserByUsername(req.body.user.username)
    .then(data => {
        if (!data)
            return response.errorResponse(res, "Something wrong in delete router 1")
        likedDB.delete(req.session.user, data.id)
        .then(data => response.response(res, "Like delected"))
        .catch(err => response.errorCatch(res, "Something wrong in the liked router 2", err))
    })
    .catch(err => response.errorCatch(res, "Something wrong in delete 3", err))
})



router.get("/likers", (req, res, next) =>{
    likedDB.getAlllikers(req.session.user)
    .then(data => response.response(res, data))
    .catch(err => response.errorCatch(res, "Something wrong in likers", err))
})

router.get("/", (req, res, next) =>{
    likedDB.getAllLiked(req.session.user)
    .then(data => response.response(res, data))
    .catch(err => response.errorCatch(res, "Something wrong in liked", err))
})

module.exports = router;