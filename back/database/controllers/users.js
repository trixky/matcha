const database = require('../database');
const _string = require('../../lib/_string');

let usersController = {};

usersController.index = function(req, res) {
    database.any(
        'SELECT * FROM USERS'
    ).then(function(data) {
        res.json({ _status: 0, _data: data });
    }).catch(function(error) {
        res.json({ _status: -1, _message: null, _error: error});
    });
};

usersController.show = function(req, res) {

    const id = _string.strToUint(req.params.id);

    if (id < 0) {
        res.json({ _status: -1, _message: 'invalid id' });
        return;
    }

    database.one(
        'SELECT * FROM USERS WHERE (id = $1)',
        id
    ).then(function(data) {
        res.json({ _status: 0, _data: data });
    }).catch(function(error) {
        res.json({ _status: -1, _message: null, _error: error});
    });
};

module.exports = usersController;
