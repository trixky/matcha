var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const sendMail = require("../Model/sendmail")
const userDB = require("../database/controllers/userDB")
const response = require("../Model/response")

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

router.post('/password', function(req, res, next) {
    
    const email = req.body.email;

    if (!email)
        return response.errorResponse(res, {email :"No email gived"});

    if (isValidEmail(email))
        userDB.findOneUserByEmail(email)
        .then(data =>{
            if (!data)
                return response.errorResponse(res, {email: "No user with this email adresse"});
            else
                response.response(res, "");
            const id =  data.id;
            const newPass = "_" + Math.random().toString(36).substr(2, 9);
            const newPassHash = crypto.createHash('sha256')
                            .update(newPass)
                            .digest('hex');
            sendMail.sendNewPassword(email, newPass);
            userDB.updateOnePasswordById(id, newPassHash)
        })
        .catch(err => response.errorCatch(res, {email: "Something went wrong in forget password"}, err))
    else
        return response.errorResponse(res, {email :"Not a valid email adresse"});
});

router.post('/username', function(req, res, next) {
    
    const email = req.body.email;
    
    if (!email)
        return response.errorResponse(res, {email :"No email gived"});
        
    if (isValidEmail(email))
        userDB.findOneUserByEmail(email)
        .then(data =>{
            if (!data)
                return  response.errorResponse(res, {email: "No user with this email adresse"});
            else
                response.response(res, "");
            const username = data.username;
            sendMail.sendUsername(email, username);
        })
        .catch(err => response.errorCatch(res, {email: "No user with this email adresse"}, err))
    else
        return response.errorResponse(res, {email :"Not a valid email adresse"});
});

module.exports = router;
