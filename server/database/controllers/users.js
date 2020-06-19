const database = require('../database');
const _string = require('../../lib/_string');
const crypto = require('crypto');
const sendMail = require("../../Model/sendmail")

let usersController = {};

function errorResponse(res,  message)
{
    return res.json({
        _status: -1,
        _message: message 
    })
}

usersController.index = function(req, res) {
    database.any(
        'SELECT * FROM users'
    ).then(function(data) {
        res.json({ _status: 0, _data: data });
    }).catch(function(error) {
        res.json({ _status: -1, _message: error.message });
    });
};

usersController.login = function(req, res) {

    if (req.body === undefined
        || req.body.user === undefined
        || req.body.user.password === undefined)
    return errorResponse(res, 'missing user information')

    let email = req.body.user.email;
    let password = crypto.createHash('sha256')
                         .update(req.body.user.password)
                         .digest('hex');

    database.one(
        'SELECT * FROM users WHERE'
        + ' (email = $1 AND password = $2)',
        [email, password]
    ).then(function(data) {
        if (data.verified)
            return errorResponse(res, 'Your account was not valided, a new email will be send to you')
        req.session.user = data;
        res.json({ _status: 0, _data: data });
    }).catch(function(error) {
        errorResponse(res, error.message)
    });
};

usersController.create = function(req, res) {

    if (req.body === undefined
        || req.body.user === undefined
        || req.body.user.password === undefined)
    return errorResponse(res, 'missing user information')

    let user = req.body.user;
    user.verified =  crypto.createHash('sha256').digest("hex");
    user.password = crypto.createHash('sha256')
                          .update(user.password)
                          .digest('hex');
    sendMail.confirmMail(user.email, user.verified);
    database.none(
        'INSERT INTO users'
        + '(id, email, username, firstname, lastname, password, verified, created)'
        + ' '
        + 'SELECT'
        + ' COUNT(*) AS id,'
        + ' $[email] AS email,'
        + ' $[username] AS username,'
        + ' $[firstname] AS firstname,'
        + ' $[lastname] AS lastname,'
        + ' $[password] AS password,'
        + ' $[verified] AS verified,'
        + ' CURRENT_TIMESTAMP as created'
        + ' FROM users',
        user
    ).then(function() {
        res.json({ _status: 0, _data: null });
    }).catch(function(error) {
        return errorResponse(res, error.message)
    });
};

usersController.show = function(req, res) {

    const id = _string.strToUint(req.params.id);

    if (id < 0) {
        res.json({ _status: -1, _message: 'invalid id' });
        return;
    }

    database.one(
        'SELECT * FROM users WHERE (id = $1)',
        [id]
    ).then(function(data) {
        res.json({ _status: 0, _data: data });
    }).catch(function(error) {
        res.json({ _status: -1, _message: error.message });
    });
};

module.exports = usersController;
