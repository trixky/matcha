const nodemailer = require("nodemailer")

const sendMail = {};

var transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 25,
    auth: {
        user: 'darkpikooli@gmail.com',
        pass: 'ParisSchool42'
    }
});

// send email function , give it the email of the destinatair 
// and a text in html for the message 
function send(email, text){
    var mailOptions = {
        from: "darkpikooli@gmail.com",
        to: email,
        subject: "Matcha service account",
        html: text
    }
    transporter.sendMail(mailOptions, function(error, info){
    if (error)
        return
    })
    transporter.close()
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

function verifiedMessage(email, verified){
    return `You have just registe to Matcha, Welcome <br/>
     Please click on this link to verified your account <br/><br/>
     <a href="http://localhost:3001/verified?email=${email}&verified=${verified}">Matcha verified<a/> <br/><br/>
     All the team of Matcha thank you for using our service. <br/>
     This email is automatic, don't reply to it.`
}

sendMail.sendUsername = (email, username) =>{
    send(email, usernameMessage(username))
}

sendMail.sendNewPassword = (email, newPassword) =>{
    send(email, newPassMessage(newPassword))
}

sendMail.confirmMail = (email, verified) => {
    send(email,verifiedMessage(email, verified))
}


module.exports = sendMail;