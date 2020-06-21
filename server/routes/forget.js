var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const sendMail = require("../Model/sendmail")
const userDB = require("../database/controllers/userDB")

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function errorResponse(res,  message)
{
    return res.json({
        _status: -1,
        _message: message 
    })
}

router.post('/password', function(req, res, next) {
    
    const email = req.body.email;

    if (!email)
        return errorResponse(res, "No email gived");
    if (isValidEmail(email))
        userDB.findOneUserByEmail(email)
        .then(data =>{
            if (!data)
                return errorResponse(res, "No user with this email adresse");
            else
                res.end();
            const id =  data.id;
            const newPass = "_" + Math.random().toString(36).substr(2, 9);
            const newPassHash = crypto.createHash('sha256')
                            .update(newPass)
                            .digest('hex');
            sendMail.sendNewPassword(email, newPass);
            userDB.updateOnePasswordById(id, newPassHash)
        })
    else
        return errorResponse(res, "Not a valid email adresse");
});

router.post('/username', function(req, res, next) {
    
    const email = req.body.email;
    
    if (!email)
        return errorResponse(res, "No email gived");
    if (isValidEmail(email))
        userDB.findOneUserByEmail(email)
        .then(data =>{
            if (!data)
                return errorResponse(res, "No user with this email adresse");
            else
                res.end();
            const username = data.username;
            sendMail.sendUsername(email, username);
        })
    else
        return errorResponse(res, "Not a valid email adresse");
});

module.exports = router;
