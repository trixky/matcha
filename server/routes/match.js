const router = require("express").Router()
const matchDB = require("../database/controllers/match")
const response = require("../Model/response")

router.get("/", (req, res, next) => {
    matchDB.getAllById(req.session.user)
    .then(data => response.response(res, data))
    .catch(err => response.errorCatch(res, "Something went wrong on match", err))
})


module.exports = router