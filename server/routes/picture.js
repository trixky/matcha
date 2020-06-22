const express = require("express")
const mutler = require("multer")
const picture = require("../Model/picture")
const reponse = require("../Model/reponse")

const router = express.Router()

router.use("/", function(req, res){
    picture.save(req, res, (err) => {
        if (err)
            return reponse.errorResponse(res, {picture: err.message})
        reponse.response(res, {picture: "ok"})
    })

})

module.exports = router