var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const sendmail = require("../Model/sendmail")
const userDB = require("../database/controllers/userDB")

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// the message that we send by mail to the user 
function newPassMessage(newPassword){
    
    return `You have request a new password for your matcha account <br/><br/>
     The new password is : ${newPassword} <br/><br/>
     <a href="http://localhost:3000">Matcha<a/> <br/>
     All the team of Matcha thank you for using our service. <br/>
     This email is automatic, don't reply to it.`
}

function usernameMessage(username){
    return `You have request the username for your matcha account <br/><br/>
     Your username is : ${username} <br/><br/>
     <a href="http://localhost:3000">Matcha<a/> <br/>
     All the team of Matcha thank you for using our service. <br/>
     This email is automatic, don't reply to it.`
}

router.post('/password', function(req, res, next) {
    
    const email = req.body.email;

    if (isValidEmail(email))
        userDB.findOneUserIdByEmail(email)
        //findOneUserId(email)
        .then(data =>{
            if (!data)
                return res.send("No user with this email adresse")
            else
                res.end();
            
            const id =  data.row.substr(1, data.row.length - 2).split(",")[0];

            const newPass = "_" + Math.random().toString(36).substr(2, 9);
            const newPassHash = crypto.createHash('sha256')
                            .update(newPass)
                            .digest('hex');

            sendmail(email, newPassMessage(newPass));
            userDB.updateOnePasswordById(id, newPassHash)
            //updateOne(id, newPassHash)
        })
    else
        res.send("Not a valid email adresse");
});

router.post('/username', function(req, res, next) {
    
    const email = req.body.email;

    if (isValidEmail(email))
        userDB.findOneUserIdByEmail(email)
        .then(data =>{
            if (!data)
                return res.send("No user with this email adresse")
            else
                res.end();
            
            const username = data.row.substr(1, data.row.length - 2).split(",")[1];
            sendmail(email, usernameMessage(username));
        })
    else
        res.send("Not a valid email adresse");
});

module.exports = router;
