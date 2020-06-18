var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var forgetRouter = require("./routes/forget")

var session = require('express-session');

var app = express();

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
        || req.originalUrl === '/forget/username')
    {
        next();
    } else {
        res.json({ _status: -1, _message: "acess denied", _error: null });
    }
});

/* ----------------------------------------- */

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/forget", forgetRouter);

module.exports = app;
