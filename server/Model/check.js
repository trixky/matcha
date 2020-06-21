const check = {}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const badEmail = "This is not a valid email or it to long it should be max 320 character"
const longUsername = "Username to long < 30 character"
const longFirstname = "Firstname to long < 30 character"
const longLastname = "Lastname to long < 30 character"
const badPassword = "Password not secure, between 8 to 30 character with at least one digit and one letter"

check.user = (user) =>{
    
    var ret = {}

    if (!isValidEmail(user.email))
        ret.email = badEmail;
    if (user.username.length > 2)
        ret.username = longUsername
    if (user.firstname.length > 2)
        ret.firstname = longFirstname
    if (user.lastname.length > 2)
        ret.lastname = longLastname
    if (!/\d*/.test(user.password) 
    || !/[a-z,A-Z]*/.test(user.password)
    || user.password.length < 8
    || user.password.length > 30)
        ret.password = badPassword;
    return ret;    
}

module.exports = check;