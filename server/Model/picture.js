const fs = require("fs")
const multer = require("multer")
const userDB = require("../database/controllers/userDB")
const reponse = require("../Model/reponse")

const picture = {}

const dir = __dirname.split("/Model")[0] + "/public"

multerupdate = multer({dest : dir})

picture.save = multerupdate.single('image')

picture.changeName = (req, res, next) => {
    var filename = req.file.originalname

    if (!req.file)
        return reponse.errorResponse(res, {picture : "Error upload picture"})
    fs.rename(req.file.path, dir + "/" + filename , () => {
        userDB.updatePicture(0, filename)
        .then(data => {
            if (data)
                reponse.Response(res, {picture :"Picture have been upload"});
            else
                reponse.errorResponse(res, {picture : "Already 5 picture"})
        })
        .catch(err => reponse.errorResponse(res, {picture : "Error upload picture"}))
    })
}

module.exports = picture