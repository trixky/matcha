const database = require('../database');
const _string = require('../../lib/_string');
const crypto = require('crypto');

let usersController = {};

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
    {
        res.json({
             _status: -1,
            _message: 'missing user information',
        });
        return;
    }

    let email = req.body.user.email;
    let password = crypto.createHash('sha256')
                         .update(req.body.user.password)
                         .digest('hex');

    database.one(
        'SELECT * FROM users WHERE'
        + ' (email = $1 AND password = $2)',
        [email, password]
    ).then(function(data) {
        req.session.user = data;
        res.json({ _status: 0, _data: data });
    }).catch(function(error) {
        res.json({ _status: -1, _message: error.message });
    });
};

usersController.create = function(req, res) {

    if (req.body === undefined
        || req.body.user === undefined
        || req.body.user.password === undefined)
    {
        res.json({
             _status: -1,
            _message: 'missing user information'
        });
        return;
    }

    let user = req.body.user;
    user.password = crypto.createHash('sha256')
                          .update(user.password)
                          .digest('hex');

    database.none(
        'INSERT INTO users'
        + '(id, email, username, firstname, lastname, password, created)'
        + ' '
        + 'SELECT'
        + ' COUNT(*) AS id,'
        + ' $[email] AS email,'
        + ' $[username] AS username,'
        + ' $[firstname] AS firstname,'
        + ' $[lastname] AS lastname,'
        + ' $[password] AS password,'
        + ' CURRENT_TIMESTAMP as created'
        + ' FROM users',
        user
    ).then(function() {
        res.json({ _status: 0, _data: null });
    }).catch(function(error) {
        res.json({ _status: -1, _message: error.message });
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
