var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const path = require("path")
const cors = require('cors')
var session = require('express-session');
const reponse = require("./Model/reponse")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var forgetRouter = require("./routes/forget")
var verifiedRouter = require("./routes/verified")
var testRouter = require("./routes/test")
var pictureRouter = require("./routes/picture")
var accountRouter = require("./routes/account")

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* Authentication Middleware (before routes) */

app.use(session({
    saveUninitialized: false,
    secret: 'session_secret',
    resave: false
}));

app.use(function(req, res, next) {

    if (req.session.user
        || req.originalUrl === '/users/login'
        || req.originalUrl === '/users/create'
        || req.originalUrl === '/forget/password'
        || req.originalUrl === '/forget/username'
        || req.originalUrl.includes('/test')
        || req.originalUrl.includes('/verified'))
    {
        next();
    } else {
       reponse.errorResponse(res, {error: "Acces denied"});
    }
});

/* ----------------------------------------- */

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/forget", forgetRouter);
app.use("/verified", verifiedRouter)
app.use("/picture", pictureRouter)
app.use("/account", accountRouter)

app.use("/test", testRouter)

module.exports = app;
