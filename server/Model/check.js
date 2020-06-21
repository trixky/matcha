const check = {}
const userDB = require("../database/controllers/userDB")

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const badEmail = "This is not a valid email or it to long it should be max 50 character"
const longUsername = "Username have to be between 1 to 30 character"
const longFirstname = "Firstname have to be between 1 to 30 character"
const longName = "Name have to be between 1 to 30 character"
const badPassword = "Password is incorrect, between 8 to 30 character with at least one digit and one letter"
const badGender = "Gender should be f , m or b";
const badSexualPref = "Sexual preference should be f, m or b"
const badBiography = "Biography should be least than 500 caratere"
const badTag = "A error with a tag"

// !!! have to change the value later 

check.userCreate = (user) =>{
    
    var ret = {}
        
    if (!user.email || !isValidEmail(user.email) || user.email.length > 50)
        ret.email = badEmail;
    if (!user.username || user.username.length > 30 || user.username.length === 0)
        ret.username = longUsername
    if (!user.firstname || user.firstname.length > 30 || user.firstname.length === 0)
        ret.firstname = longFirstname
    if (!user.name || user.name.length > 30 || user.name.length === 0)
        ret.name = longName
    if (!user.password || !/\d*/.test(user.password) 
    || !/[a-z,A-Z]*/.test(user.password)
    || user.password.length < 8
    || user.password.length > 30)
        ret.password = badPassword;
    
    return ret;    
}

function ft_checkTag(user){
    return false;
}

check.userProfile = (user) =>{
    var ret = {}
    var ret = {}
    
    if (user.email)
        if (!isValidEmail(user.email) || user.email.length > 50)
            ret.email = badEmail;
    if (user.username)
        if (user.username.length > 30 || user.username.length === 0)
            ret.username = longUsername

    if (user.firstname)
        if (user.firstname.length > 30 || user.firstname.length === 0)
            ret.firstname = longFirstname
    if (user.name)
        if (user.name.length > 30 || user.name.length === 0)
            ret.name = longName

    if (user.password)            
        if (!/\d*/.test(user.password) 
        || !/[a-z,A-Z]*/.test(user.password)
        || user.password.length < 8
        || user.password.length > 30)
            ret.password = badPassword;

    if (user.gender)
        if (user.gender != 'f' 
        && user.gender != 'm' 
        && user.gender != 'b')
            ret.gender = badGender;
    if(user.sexualpref)
        if (user.sexualpref != 'f' 
        && user.sexualpref != 'm' 
        && user.sexualpref != 'b')
            ret.sexualpref = badSexualPref;
    if (user.biography)
        if (user.biography.length > 500)
            ret.biography = badBiography;
    if (user.tag)
        if (ft_checkTag(user))
            ret.tag = badTag;
    return ret;
}

module.exports = check;
