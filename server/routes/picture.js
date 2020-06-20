const express = require("express")
const upload = require("../Model/picture")

const router = express.Router()

router.use("/", upload.save, upload.changeName)

module.exports = router