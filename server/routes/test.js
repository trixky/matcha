const fs = require("fs")
const express =require("express")
const router = express.Router();
var path = require('path');
const blocked = require("../database/controllers/blocked")
const userdb = require("../database/controllers/userDB")

router.use("/", (req, res) =>{
    const user = userdb.findOneUserIdByEmail("email@email.com").then(user =>{
    //blocked.create(0, {id: 1, username : "toto"})
    blocked.delete(0, 1)
    .then(data => res.send(data))
    .catch(err => res.send("no"))
    });
})

module.exports = router
