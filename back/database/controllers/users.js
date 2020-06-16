const database = require('../database');
const _string = require('../../lib/_string');

let usersController = {};

usersController.index = function(req, res) {
    database.any(
        'SELECT * FROM users'
    ).then(function(data) {
        res.json({ _status: 0, _data: data });
    }).catch(function(error) {
        res.json({ _status: -1, _message: null, _error: error});
    });
};

usersController.login = function(req, res) {

    if (req.body === undefined || req.body.user === undefined ) {
        res.json({
             _status: -1,
            _message: 'missing user information',
            _error: null
        });
        return;
    }

    database.one(
        'SELECT * FROM users WHERE'
        + ' (email = $[email] AND password = $[password])',
        req.body.user
    ).then(function(data) {
        res.json({ _status: 0, _data: data });
    }).catch(function(error) {
        res.json({ _status: -1, _message: null, _error: error});
    });
};

usersController.create = function(req, res) {

    if (req.body === undefined || req.body.user === undefined ) {
        res.json({
             _status: -1,
            _message: 'missing user information',
            _error: null
        });
        return;
    }

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
        req.body.user
    ).then(function() {
        res.json({ _status: 0, _data: null });
    }).catch(function(error) {
        res.json({ _status: -1, _message: null, _error: error});
    });
};

usersController.show = function(req, res) {

    const id = _string.strToUint(req.params.id);

    if (id < 0) {
        res.json({ _status: -1, _message: 'invalid id', error: null });
        return;
    }

    database.one(
        'SELECT * FROM users WHERE (id = $1)',
        [id]
    ).then(function(data) {
        res.json({ _status: 0, _data: data });
    }).catch(function(error) {
        res.json({ _status: -1, _message: null, _error: error});
    });
};

module.exports = usersController;
