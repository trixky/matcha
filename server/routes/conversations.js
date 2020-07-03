const router = require("express").Router()
const conversationsDB = require("../database/controllers/conversations")
const response = require("../Model/response")


router.get("/", (req, res, next) =>{
    conversationsDB.getAll(req.session.user)
    .then(data => {
        if(data)
            return response.response(res, data)
        response.response(res, [])
    })    .catch(err => response.errorCatch(res, "something went wrong in conversations router ", err))
})

module.exports = router;