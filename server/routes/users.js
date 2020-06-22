var express = require('express');
var router = express.Router();
var userDB = require("../database/controllers/userDB")
const reponse = require("../Model/reponse")

const usersController = require('../database/controllers/users');

router.get('/',(req, res) => {
    userDB.findAll()
    .then(data => reponse.response(res, data))
    .catch(err => reponse.errorResponse(res, {error: "Something went wrong"}))
});

router.post('/login', usersController.login);
router.post('/create', usersController.create);

router.get('/:id', usersController.show);

module.exports = router;
