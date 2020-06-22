const express = require("express")
const picture = require("../Model/picture")
const reponse = require("../Model/reponse")
const userDB = require("../database/controllers/userDB")
const utils = require("../Model/utils")
const router = express.Router()

router.post("/:id", function(req, res, next){
    if ((req.params.id < "5" 
    && req.params.id > "0")
    || req.params.id === "profile")
        picture.single(req, res, (err) => {
            if (err)
                return reponse.errorResponse(res,  err.message)
            else
                next();})
    else
        return reponse.response(res, "Bad image number have to be between 1 - 4")
    },
    (req, res, next) => {
        if (req.params.id === "profile")
            userDB.updatePictureProfile(req.session.user, req.file.filename)
            .then(data => reponse.response(res, ""))
            .catch(err => utils.log(err))
        else
            userDB.updatePicture(req.session.user, req.file.filename, req.params.id)
            .then(data => reponse.response(res, ""))
            .catch(err => utils.log(err))
    }
)

router.put("/:id",(req, res, next) => {
    userDB.deleteColumn(req.session.user, "profile")
    .then(data => reponse.response(res, ""))
        .catch(err => utils.log(err))
})
module.exports = router