const fs = require("fs")
const express =require("express")
const router = express.Router();
var path = require('path');
const userdb = require("../database/controllers/userDB")
const account = require("./account")

router.use("/", (req, res) =>{
    const user = userdb.findOneUserByEmail("email@email.com").then(user =>{
    blocked.delete(0, 1)
    .then(data => res.send(data))
    .catch(err => res.send("no"))
    });
})

module.exports = account;
