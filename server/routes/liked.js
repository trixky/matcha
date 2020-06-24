const router = require("express").Router();
const userDB = require("../database/controllers/userDB")
const response = require("../Model/response")
const likedDB = require("../database/controllers/liked")
const socket = require("../Model/socket")

router.post("/", (req, res, next) => {
    userDB.findOneUserByUsername(req.body.user.username)
    .then(data => {
        if (!data.username)
            return response.errorResponse(res, "No use with this username in the database")
            
        var likedData = data;
        
        userDB.findOneUserById(req.session.user)
        .then(data => {
            likedDB.findOneLike(data, likedData)
            .then(data => {
                if(data.id)
                    return likedDB.create(data, likedData)
                    .then(data => {
                        response.response(res, "");
                        socket.notification(likedData.id, "You just got a new liker")
                    })
                    .catch(err => response.errorResponse(res, "Something wrong in the liked router 1"))
                response.errorResponse(res, "You already like this personne")
            })
            .catch(err => response.errorResponse(res, "Something wrong in the liked router 2"))
        })
        .catch(err => response.errorResponse(res, "Something wrong in the liked router 3"))
    })
    .catch(err => response.errorResponse(res, "Something wrong in the liked router 4"))
})

router.get("/likers", (req, res, next) =>{
    likedDB.getAlllikers(req.session.user)
    .then(data => response.response(res, data))
    .catch(err => response.errorResponse(res, "Something wrong in likers"))
})

router.get("/", (req, res, next) =>{
    likedDB.getAllLiked(req.session.user)
    .then(data => response.response(res, data))
    .catch(err => response.errorResponse(res, "Something wrong in liked"))
})

module.exports = router;