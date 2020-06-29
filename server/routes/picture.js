const express = require("express")
const picture = require("../Model/picture")
const response = require("../Model/response")
const userDB = require("../database/controllers/userDB")
const utils = require("../Model/utils")
const router = express.Router()

router.post("/:id", function(req, res, next){
    
    if ((req.params.id < 5 
    && req.params.id > 0)
    || req.params.id === "profile")
    {
        picture.single(req, res, (err) => {
            if (err)
                return response.errorResponse(res,  err.message)
            else
                next();})
    }
    else
        return response.errorResponse(res, "Bad image number have to be between 1 - 4")
    },
    (req, res, next) => {
        if (req.params.id === "profile")

            userDB.updatePictureProfile(req.session.user, req.file.filename)
            .then(data => response.response(res, "Profile picture updated"))
            .catch(err => response(res, "Something went wrong on picture", err))
        else

            userDB.updatePicture(req.session.user, req.file.filename, req.params.id)
            .then(data => response.response(res, "Picture updated"))
            .catch(err => response.errorCatch(res, "Something went wrong on POST picture", err))
    }
)

router.put("/:id", pictureId,
(req, res, next) => {
    if ((req.params.id > 5 
    || req.params.id < 0)
    && req.params.id != "profile")
        return response.errorResponse(res, "Bad image number have to be between 1 - 4")

    userDB.deletePicture(req.session.user, req.params.id)
    .then(data => response.response(res, "Picture delected"))
    .catch(err => response.errorCatch(res, "Something went wrong on PUT picture", err))
})

function pictureId(req, res, next){
    if ((req.params.id < "5" 
    && req.params.id > "0")
    || req.params.id === "profile")
                next()
    else
        return response.response(res, "Bad image number have to be between 1 - 4")
}

module.exports = router