const fs = require("fs")
const express =require("express")
const router = express.Router();
var path = require('path');

var picture = "canard.jpg"
var pictureData;

fs.readFile(__dirname + "/picture/" + picture, (err , data) => {
    pictureData = data;
})

router.post("/", (req, res) => {
    res.json({data:"ok"})
})

module.exports = router