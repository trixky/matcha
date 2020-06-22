const fs = require("fs")
const multer = require("multer")
const userDB = require("../database/controllers/userDB")
const reponse = require("../Model/reponse")

const picture = {}
const dir = __dirname.split("/Model")[0] + "/public";


picture.MulterError = multer.MulterError;

// multerupdate = multer({
//                         dest : dir,
//                         filename: "test"
// })

var storage = multer.diskStorage({
                        destination : function(req, file, cb){
                            cb(null, dir);
                        },
                        filename: function(req, file, cb){
                            cb(null, "tests");
                        }
})

function fileFilter(req, file, cb){
     if (file.mimetype === 'image/jpeg'
     || file.mimetype === 'image/png'
     || file.mimetype === 'image/bmp')
         cb(null, true);
     else
        cb(new Error("Not a jpg or bmp file"))
}

multerupdate = multer({
                    storage: storage,
                    fileFilter: fileFilter
                    })

picture.save = multerupdate.single('image')

module.exports = picture