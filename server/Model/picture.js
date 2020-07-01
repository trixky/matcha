const multer = require("multer")
const {uuid} = require("uuidv4")
const dir = __dirname.split("/Model")[0] + "/public";

const picture = {}

picture.MulterError = multer.MulterError;

var storage = multer.diskStorage({
                        destination : function(req, file, cb){
                            cb(null, dir);
                        },
                        filename: function(req, file, cb){
                            if (req.url === "/profile")
                                cb(null,  "profile_" + req.session.user)
                            else
                                cb(null,  uuid())
                        }
})

function fileFilter(req, file, cb){
    
    if (file.mimetype === 'image/jpeg'
     || file.mimetype === 'image/png'
     || file.mimetype === 'image/bmp')
         cb(null, true);
     else
        cb(new Error("Only file in jpg ,png or bmp format"))
}

multerupdate = multer({
                    storage: storage,
                    fileFilter: fileFilter,
                    limits: {fileSize: 1000000}
                    })

picture.single = multerupdate.single('image')

module.exports = picture