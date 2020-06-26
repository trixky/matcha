
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
var messageRouter = require("./message")

router.use("/get", (req, res, next) => {
    req.session.user = 1
  fs.readFile(__dirname.split("routes")[0] + "/ressource/index.html", (err, file)=>{
      res.end(file)
  })
 })

router.use("/account", (req, res, next) => {
    req.session.user = 0
    req.session.username = "username"
next()}
,accountRouter)

router.use("/picture", (req, res, next) => {
    req.session.user = 0
    req.session.username = "username"
next()}
,pictureRouter)

router.use("/liked", (req, res, next) => {
    req.session.user = 0
    req.session.username = "username"
next()}
   ,likedRouter)

router.use("/notification", (req, res, next) => {
    req.session.user = 0
    req.session.username = "username"
next()}
 ,notificationsRouter)

 router.use("/match", (req, res, next) => {
    req.session.user = 0
    req.session.username = "username"
next()}
, matchRouter);

router.use("/message", (req, res, next) => {
    req.session.user = 0
    req.session.username = "username"
next()}
, messageRouter);

module.exports = router;
