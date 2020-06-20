const fs = require("fs")
const path = require("path")
const multer = require("multer")

const upload = {}

const dir = __dirname.split("/Model")[0] + "/public"


multerupdate = multer({dest : dir})

upload.save = multerupdate.single('image')

upload.changeName = (req, res, next) => {
    
    if (!req.file)
        return res.send("error")
    fs.rename(req.file.path, dir + "/" + req.file.originalname , () => {
        res.send("ok")
    })
}

module.exports = upload