const check = {}
const userDB = require("../database/controllers/userDB")

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
// const alltags = {}
// alltags

const allTags = {   "language": true,
                    "movies": true,
                    "pets": true,
                    "nature": true,
                    "adventure": true,
                    "writing": true,
                    "fitness": true,
                    "astrology": true,
                    "shopping": true,
                    "technology": true,
                    "music": true,
                    "travel": true,
                    "photography": true,
                    "reading": true,
                    "sports": true,
                    "cooking": true,
                    "food": true,
                    "carrer": true,
                    "art": true,
                    "life": true,
                    "religion": true,
                    "history": true,
                    "school": true,
                    "science": true,
                    "family": true,
                    "sex": true,
                    "relationships": true,
                    "environement": true
                }

const badEmail = "This is not a valid email or it to long it should be max 50 character"
const longUsername = "Username have to be between 1 to 30 character"
const longFirstname = "Firstname have to be between 1 to 30 character"
const longName = "Name have to be between 1 to 30 character"
const badPassword = "Password is incorrect, between 8 to 30 character with at least one digit and one letter"
const badGender = "Gender should be f , m or b";
const badOrientation = "Orientation sexual should be f, m or b"
const badBiography = "Biography should be least than 500 caratere"
const badTag = "A error with the tag"
const badGps = "A error with gps values"
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
    if (!user.password 
    || !/\d*/.test(user.password) 
    || !/[a-zA-Z]/.test(user.password)
    || user.password.length < 8
    || user.password.length > 30)
        ret.password = badPassword;
    
    return ret;    
}

function ft_checkTag(user){
    
    for(var j = 0; j < user.tags.length; j++)
    {    
        if(allTags[user.tags[j]] === undefined)
            return true;
    }
    return false;
}


check.password = (user) =>{
    if (user.password)            
        if (!/\d*/.test(user.password) 
        || !/[a-z,A-Z]*/.test(user.password)
        || user.password.length < 8
        || user.password.length > 30)
            return  badPassword;
    return null;
}

check.userProfile = (user) =>{
    
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
    if (user.latitude)
        if (isNaN(user.latitude))
            ret.gps = badGps;
    if (user.longitude)
        if (isNaN(user.longitude))
                ret.gps = badGps;
    if (user.gender)
        if (user.gender != 'man' 
        && user.gender != 'women' 
        && user.gender != 'non binary')
            ret.gender = badGender;
    if(user.orientation)
        if (user.orientation != 'heterosexual' 
        && user.orientation != 'homosexual' 
        && user.orientation != 'bisexual')
            ret.orientation = badOrientation;
    if (user.biography)
        if (user.biography.length > 500)
            ret.biography = badBiography;
    if (user.tags)
        if (ft_checkTag(user))
            ret.tags = badTag;
    return ret;
}

module.exports = check;
