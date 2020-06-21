const check = {}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const badEmail = "This is not a valid email or it to long it should be max 50 character"
const longUsername = "Username have to be between 1 to 30 character"
const longFirstname = "Firstname have to be between 1 to 30 character"
const longLastname = "Name have to be between 1 to 30 character"
const badPassword = "Password not secure, between 8 to 30 character with at least one digit and one letter"

// !!! have to change the value later 

check.user = (user) =>{
    
    var ret = {}
    
    if (!user.email || !isValidEmail(user.email) || user.email.length > 50)
        ret.email = badEmail;
    if (!user.username || user.username.length > 2 || user.username.length === 0)
        ret.username = longUsername
    if (!user.firstname || user.firstname.length > 2 || user.firstname.length === 0)
        ret.firstname = longFirstname
    if (!user.name || user.name.length > 2 || user.name.length === 0)
        ret.name = longLastname
    if (!user.password || !/\d*/.test(user.password) 
    || !/[a-z,A-Z]*/.test(user.password)
    || user.password.length < 8
    || user.password.length > 30)
        ret.password = badPassword;
    
    return ret;    
}

module.exports = check;
