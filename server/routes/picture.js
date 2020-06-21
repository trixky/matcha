const express = require("express")
const picture = require("../Model/picture")

const router = express.Router()

router.use("/", picture.save, picture.changeName)

module.exports = router