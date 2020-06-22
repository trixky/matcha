var express = require('express');
var router = express.Router();
var userDB = require("../database/controllers/userDB")
const reponse = require("../Model/reponse")

const usersController = require('../database/controllers/users');

router.get('/',(req, res) => {
    userDB.findAll()
    .then(data => reponse.response(res, data))
    .catch(err => reponse.errorResponse(res, "Something went wrong in users"))
});

router.post('/login', usersController.login);
router.post('/create', usersController.create);

router.get('/:id', (req, res) => {
    userDB.findOneUserById(req.params.id)
    .then(data => reponse.response(res, data))
    .catch(err => reponse.errorResponse(res, "Something went wrong in users"))
});

module.exports = router;
