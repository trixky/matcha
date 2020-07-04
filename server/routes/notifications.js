const router = require("express").Router()
const notificationsDB = require("../database/controllers/notifications")
const response = require("../Model/response")
const utils = require("../Model/utils")

router.get("/", (req, res, next) =>{
    notificationsDB.findAllById(req.session.user)
    .then(data => {
        if(data){
            data = utils.formateDateArray(data)
            data = utils.marketNotifications(data)
            return response.response(res, data)
        }
        response.response(res, [])
    })
    .catch(err => response.errorCatch(res, "Something went wrong in notifications router", err))
})



module.exports = router