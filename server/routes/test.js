
const express =require("express")
const router = express.Router();
var indexRouter = require('./index');
var usersRouter = require('./users');
var forgetRouter = require("./forget")
var verifiedRouter = require("./verified")
var accountRouter = require("./account")
var pictureRouter = require("./picture")
var likedRouter = require("./liked")

router.use("/", (req, res, next) => {
    req.session.user = 0
     next()
 }
//  ,pictureRouter)
 ,likedRouter)

module.exports = router;
