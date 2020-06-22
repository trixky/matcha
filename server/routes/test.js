
const express =require("express")
const router = express.Router();
var indexRouter = require('./index');
var usersRouter = require('./users');
var forgetRouter = require("./forget")
var verifiedRouter = require("./verified")
var accountRouter = require("./account")
var pictureRouter = require("./picture")

router.use("/", (req, res, next) => {
    req.session.user = 0
     next()
 }
 ,pictureRouter)

module.exports = router;
