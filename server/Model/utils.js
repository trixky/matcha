const fs = require('fs')
const utils = {}

utils.randomString = () => {
    return  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

utils.stream = fs.createWriteStream(__dirname.split("/Model")[0] + "/errorLog", {flags:"a"})

utils.log = (message) => {
    utils.stream.write(message + "\r\n");
}
utils.removeFile = (filename) => {
    fs.unlink(filename, () => {})
}

module.exports = utils;