var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const response = require("./Model/response")
const session = require("./Model/socket").sessionMiddleware;
const userDB = require("./database/controllers/userDB")

// -----------------------------------------------

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var forgetRouter = require("./routes/forget")
var verifiedRouter = require("./routes/verified")
var accountRouter = require("./routes/account")
var pictureRouter = require("./routes/picture")
var likedRouter = require("./routes/liked")
var notificationRouter =require("./routes/notifications")
var matchRouter = require("./routes/match")
var messageRouter = require("./routes/message")
var blockedRouter = require("./routes/blocked")
var conversationsRouter = require("./routes/conversations")
var disconnectedRouter = require("./routes/disconnected")
var searchRouter = require("./routes/search")
var viewersRouter = require("./routes/viewers")
var fakeRouter = require("./routes/fake")
var testRouter = require("./routes/test")


var app = express();

// app.use(logger('dev'));
app.use(cors({credentials: true}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* Authentication Middleware (before routes) */

app.use(session)

app.use(function(req, res, next) {

    if (req.session.user != null
    || req.originalUrl === '/users/login'
    || req.originalUrl === '/users/create'
    || req.originalUrl === '/forget/password'
    || req.originalUrl === '/forget/username'
    || req.originalUrl.split("?")[0] === "/verified"
    || req.originalUrl.includes('/test'))
    {       
        if (req.session.user)
            userDB.updateTime(req.session.user)
        next();
    }
    else 
        response.errorResponse(res, "Acces denied");
});

/* ----------------------------------------- */

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/forget", forgetRouter);
app.use("/verified", verifiedRouter)
app.use("/picture", pictureRouter)
app.use("/account", accountRouter)
app.use("/liked", likedRouter)
app.use("/notifications", notificationRouter)
app.use("/messages", messageRouter)
app.use("/matched", matchRouter)
app.use("/blocked", blockedRouter)
app.use("/conversations", conversationsRouter)
app.use("/search", searchRouter)
app.use("/disconnect", disconnectedRouter)
app.use("/viewers", viewersRouter)
app.use("/fake", fakeRouter)
app.use("/test", testRouter)

module.exports = app
