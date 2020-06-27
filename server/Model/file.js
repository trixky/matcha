const fs = require("fs")

const path = __dirname.split("/Model")[0] + "/public/profile_";

const file = {};

file.CheckProfilePicture = (id) => {
   return fs.existsSync(path + id)
}

module.exports = file;