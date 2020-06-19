const nodemailer = require("nodemailer")

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
function sendmail(email, text){
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


module.exports = sendmail;