var express = require('express');
var router = express.Router();
var userDB = require("../database/controllers/userDB")
const response = require("../Model/response")

const usersController = require('../database/controllers/users');

router.get('/',(req, res) => {
    userDB.findAll()
    .then(data => response.response(res, data))
    .catch(err => response.errorCatch(res, "Something went wrong in users", err))
});

router.post('/login', usersController.login);
router.post('/create', usersController.create);

router.get('/:id', (req, res) => {
    userDB.findOneUserById(req.params.id)
    .then(data => response.response(res, data))
    .catch(err => response.errorCatch(res, "Something went wrong in users", err))
});

module.exports = router;
