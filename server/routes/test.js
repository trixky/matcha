
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
var blockedRouter = require("./blocked")
var conversationsRouter = require("./conversations")
var fakeRouter = require("./fake")
var disconnectedRouter = require("./disconnected")
var searchRouter =require("./search")
var viewersRouter = require("./viewers")

const filter = require("../Model/filter")
const response = require("../Model/response")

const gps = require("../Model/gps")

router.use((req, res, next) =>{
    userDB.updateTime(0)
    next();
})

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

router.use("/notifications", (req, res, next) => {
    req.session.user = 1
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

router.use("/blocked", (req, res, next) => {
    req.session.user = 0
    req.session.username = "username"
next()}
, blockedRouter);

router.use("/conversations", (req, res, next) => {
    req.session.user = 0
    req.session.username = "username"
next()}
, conversationsRouter);

router.use("/viewers", (req, res, next) => {
    req.session.user = 1
    req.session.username = "username"
next()}
, viewersRouter);

router.use("/fake", (req, res, next) => {
    req.session.user = 0
    req.session.username = "username"
next()}
, fakeRouter);

router.use("/disconnect", (req, res, next) => {
    req.session.user = 0
    req.session.username = "username"
next()}
, disconnectedRouter);


router.use("/search", (req, res, next) => {
    req.session.user = 0
    req.session.username = "username"
next()}
, searchRouter);

router.use("/gps/:ip", (req, res, next) => {
    req.session.user = 0
    req.session.username = "username"
next()}
,(req, res, next) =>{
    console.log(req.params.ip)
    gps.getCoordonned(req.params.ip)
    .then(data => {
        response.response(res, data)
    })
    .catch(err => response.errorCatch(res, "Something went wrong in gps", err));
});

router.use("/test", (req, res, next) => {
    req.session.user = 0
    req.session.username = "username"
next()}
,(req, res, next) =>{

    userDB.findOneUserById(0)
    .then(data1 => {

        filter.usersFilter(0,0)
        .then(data => {
            data = filter.filterGps(data1, data,req.body);
            data = filter.sortDistance(data1, data)
            response.response(res, data)
        })
        .catch(err => response.errorCatch(res, "Something went wrong in account, Error database", err));
      
    })

});




module.exports = router;
