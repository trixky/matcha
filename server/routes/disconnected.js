const router = require("express").Router()
const response = require("../Model/response")
const userDB = require("../database/controllers/userDB")

router.post("/", (req,res, next) =>{
    userDB.disconnect(req.session.user)
    .then(data => {
        req.session.user = null
        req.session.username = null
        response.response(res, "You have been disconected")
    })
    .catch(err => response.errorCatch(res, "Something went wrong in disconnect router", err))
})

module.exports = router;