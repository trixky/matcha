const fs = require("fs")
const express =require("express")
const router = express.Router();
var path = require('path');
const userdb = require("../database/controllers/userDB")

router.use("/", (req, res) =>{
    userdb.findArray([0,1,2])
    .then(data => res.send(data))
    .catch(err => res.send("no"))
})

module.exports = router
