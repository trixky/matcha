const router = require("express").Router()
const fakeDB = require("../database/controllers/fake")
const userDB = require("../database/controllers/userDB")
const response = require("../Model/response")

router.post("/", (req, res, next) => {
    
    if(!req.body.user || !req.body.user.username)
        return response.errorResponse(res, "Didn't give a username")

    userDB.findOneUserByUsername(req.body.user.username)
    .then(data => {
        fakeDB.create(data)
        .then(data => response.response(res, "User have been reported"))
        .catch(err => response.errorCatch(res, "Something went wrong in fake router 1", err))
    })
    .catch(err => response.errorCatch(res, "Something went wrong in fake router 2", err))
})


module.exports = router;