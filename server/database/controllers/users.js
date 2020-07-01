const crypto = require('crypto');
const ent = require("ent")
const database = require('../database');
const _string = require('../../lib/_string');
const sendMail = require("../../Model/sendmail")
const response = require("../../Model/response")
const check = require("../../Model/check")
const userDB = require("./userDB")
const utils = require("../../Model/utils")
const fakeDB = require("../controllers/fake")

let usersController = {};

function hashPassword(password){
    return crypto.createHash('sha256')
            .update(password)
            .digest('hex');
}

//to prevent xss

function encodeUserData(user){
    user.email = ent.encode(user.email);
    user.username = ent.encode(user.username);
    user.firstname = ent.encode(user.firstname);
    user.name = ent.encode(user.name);
    return user;
}

// ---------------------------------------------

usersController.login = function(req, res) {

    if (req.body === undefined
        || req.body.user === undefined
        || req.body.user.password === undefined)
    return response.errorResponse(res, 'missing user information')
    let email = req.body.user.email;
    
    var password = hashPassword(req.body.user.password)
    database.one(
        'SELECT * FROM users WHERE'
        + ' (email = $1 AND password = $2)',
        [email, password]
    ).then(function(data) {
        if (data.verified)
        {
            sendMail.confirmMail(data.email, data.verified)
            return response.errorResponse(res, 'Your account was not valided, a new email will be send to you')
        }
        fakeDB.findById(data)
        .then(dat => {
            
            if (dat)
                return response.errorResponse(res, 'You have been reported to be a faker , your account is suspended')
                
            req.session.user = data.id;
            req.session.username = data.username;
            userDB.updateConnection(data.id, true)
                .catch(err => utils.log(err));
            response.response(res, data)
        })
    }).catch(function(err) {
        response.errorCatch(res, "Bad identifiant or password", err)
    });
};

//--------------------------------------

usersController.create = function(req, res) {

    if (req.body === undefined
        || req.body.user === undefined
        || req.body.user.password === undefined)
    return response.errorResponse(res, 'missing user information')

    let user = req.body.user;
    
    const error = check.userCreate(user)
    
    user = encodeUserData(user);
    
    if (Object.entries(error).length)
        return response.errorResponse(res, error)
        user.verified =  crypto.createHash('sha256').digest("hex");
        user.password = hashPassword(user.password)
        sendMail.confirmMail(user.email, user.verified);

        database.none(
            'INSERT INTO users'
            + '(id, email, username, firstname, name, password, verified, created)'
            + ' '
            + 'SELECT'
            + ' COUNT(*) AS id,'
            + ' $[email] AS email,'
            + ' $[username] AS username,'
            + ' $[firstname] AS firstname,'
            + ' $[name] AS name,'
            + ' $[password] AS password,'
            + ' $[verified] AS verified,'
            + ' CURRENT_TIMESTAMP as created'
            + ' FROM users',
            user
        ).then(function() {
            response.response(res, "");
        }).catch(function(err) {
            error.email = "Email already taken"
            return response.errorCatch(res, error, err)
        });
};

module.exports = usersController;
