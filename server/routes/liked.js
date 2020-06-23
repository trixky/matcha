const router = require("express").Router();
const userDB = require("../database/controllers/userDB")
const response = require("../Model/response")
const likedDB = require("../database/controllers/liked")

router.post("/", (req, res, next) => {
    userDB.findOneUserByUsername(req.body.user.username)
    .then(data => {
        if (!data.username)
            return response.errorResponse(res, "No use with this username in the database")
        var likedData = data;
        
        userDB.findOneUserById(req.session.user)
        .then(data => {
            likedDB.create(data, likedData)
            .then(data => response.response(res, ""))
            .catch(err => response.errorResponse(res, "Something wrong in the liked router ok"))
        })
        .catch(err => response.errorResponse(res, "Something wrong in the liked router"))
    })
    .catch(err => response.errorResponse(res, "Something wrong in the liked router"))
})

module.exports = router;