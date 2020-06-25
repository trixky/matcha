const router = require("express").Router()
const notificationsDB = require("../database/controllers/notifications")
const response = require("../Model/response")

router.get("/", (req, res, next) =>{
    notificationsDB.findAllById(req.session.user)
    .then(data => response.response(res, data))
    .catch(err => response.errorCatch(res, "Something went wrong in notifications router", err))
})



module.exports = router