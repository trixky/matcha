
const express =require("express")
const fs = require("fs")
const router = express.Router();
const userDB = require("../database/controllers/userDB")
var indexRouter = require('./index');
var usersRouter = require('./users');
var forgetRouter = require("./forget")
var verifiedRouter = require("./verified")
var accountRouter = require("./account")
var pictureRouter = require("./picture")
var likedRouter = require("./liked")
var notificationsRouter = require("../routes/notifications")
var matchRouter = require("./match")

router.use("/get", (req, res, next) => {
    req.session.user = 1
  fs.readFile(__dirname.split("routes")[0] + "/ressource/index.html", (err, file)=>{
      res.end(file)
  })
 })

router.use("/", (req, res, next) => {
    req.session.user = 0
    req.session.username = "username"
next()}
// ,accountRouter)
,pictureRouter)
//    ,likedRouter)
//    ,notificationsRouter)
// , matchRouter);

module.exports = router;
