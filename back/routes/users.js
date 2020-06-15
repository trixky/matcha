var express = require('express');
var router = express.Router();

const usersController = require('../database/controllers/users');

router.get('/', usersController.index);

router.get('/:id', usersController.show);

module.exports = router;
