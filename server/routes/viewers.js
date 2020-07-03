const express =require("express")
const router = express.Router();
const viewersDB = require("../database/controllers/viewers")
const response = require("../Model/response")

router.get("/", (req, res, next) => {
    viewersDB.getViewers(req.session.user)
    .then(data => response.response(res, data))
    .catch(err => response(res, "Something went wrong on viewers", err))
})

module.exports = router;