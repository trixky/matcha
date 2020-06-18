var express = require('express');
var router = express.Router();
const db = require("../database/database")
const nodemailer = require("nodemailer")

var transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 25,
    auth: {
        user: 'darkpikooli@gmail.com',
        pass: 'ParisSchool42'
    }
});

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const findOneUserId = async (email) => {
  return  db.one("SELECT (id, username) FROM users WHERE email = $1", email)
  .catch(err => null)
}

const updateOne = async (id, password) => {
    return db.none("UPDATE users SET password = $1 WHERE ID = $2", [password, id])
    .then(data => data)
    .catch(err => null)
}

function newPassMessage(newPassword){
    
    return `You have request a new password for your matcha account <br/><br/>
     the new password is : ${newPassword} <br/><br/>
     <a href="http://localhost:3000">Matcha<a/> <br/>
     All the team of Matcha thank you for using our service. <br/>
     This email is automatic, don't reply to it.`
}

function sendmail(email, text){
    var mailOptions = {
        from: "darkpikooli@gmail.com",
        to: "panamepoul@gmail.com",
        subject: "Matcha service account",
        html: text
    }
    transporter.sendMail(mailOptions, function(error, info){
    if (error)
        return
    })
    transporter.close()
}

router.post('/password', function(req, res, next) {
    
    const email = req.body.email;

    if (isValidEmail(email))
        findOneUserId(email)
        .then(data =>{
            if (!data)
                return res.send("No user with this email adresse")
            else
                res.end();
            const newPass = "_" + Math.random().toString(36).substr(2, 9);
            sendmail(email, newPassMessage(newPass));
            updateOne(data.row[1], newPass)
        })
    else
        res.send("Not a valid email adresse");
});

module.exports = router;
