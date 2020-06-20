const userDB = require("../database/controllers/userDB")

const check = {}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const longEmail = "Email to long"
const badEmail = "This is not a email format"
const longUsername = "Username to long"
const longFirstname = "Firstname to long"
const longLastname = "Lastname to long"
const longPassword = "Password to long"
const passwordNotSecure = "Password not secure should be 8 caracter long with at least one digit and one letter"
const takenEmail = "This email is already taken"

check.user = (user) =>{
    var ret = []
    if (userDB.findOneUserIdByEmail(user.email))
        ret.push(takenEmail);
    if (!isValidEmail(user.email))
        ret.push(badEmail);
    if (user.email.length > 320)
        ret.push(longEmail);
    if (user.username.length > 31)
        ret.push(longUsername)
    if (user.firstname.length > 2)
        ret.push(longFirstname)
    if (user.lastname.length > 2)
        ret.push(longLastname)
    if (user.password.length > 3)
        ret.push(longPassword)
    if (!/\d*/.test(user.password) 
    || !/[a-z,A-Z]*/.test(user.password)
    || user.password.length < 8)
        ret.push(passwordNotSecure)
    return ret;
}

module.exports = check;