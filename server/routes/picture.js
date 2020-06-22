const express = require("express")
const picture = require("../Model/picture")
const reponse = require("../Model/reponse")
const userDB = require("../database/controllers/userDB")
const utils = require("../Model/utils")
const router = express.Router()

router.post("/:id", function(req, res, next){
    
    if (req.params.id > 4 || req.params.id < 1)
        return reponse.response(res, "Bad image number have to be between 1 - 4")

    picture.single(req, res, (err) => {
        if (err) {return reponse.errorResponse(res,  err.message)}
        next();})},
    (req, res, next) => {
        userDB.updatePicture(req.session.user, req.file.filename, req.params.id)
        .then(data => reponse.response(res, ""))
        .catch(err => utils.log(err))
    }
)

router.post("/profile", function(req, res, next){
    
    picture.single(req, res, (err) => {
        if (err) {return reponse.errorResponse(res,  err.message)}
        next();})},
    (req, res, next) => {
        userDB.updatePictureProfile(req.session.user, req.file.filename)
        .then(data => reponse.response(res, ""))
        .catch(err => utils.log(err))
    }
)

module.exports = router