const socketio = require("socket.io")
const session = require("express-session")
const userDB  = require("../database/controllers/userDB")

var io
var socketIo = {}

socketIo.sessionMiddleware = session({
    saveUninitialized: false,
    secret: 'session_secret',
    resave: false,
    cookie : {
        sameSite: 'strict'
    }
});

socketIo.notification = (id, notification)=>{
    if (io.clients[id])
        io.clients[id].emit('notifications', notification)
}

socketIo.messages = (id, sender, message)=>{
    if (io.clients[id])
        io.clients[id].emit('message', {sender: sender, message: message, notification: sender + " send you : " + message})
}

socketIo.matchNotification = (user1id, user2id) => {
    if (io.clients[user1id])
        socketIo.notification(user1id, "You got a match, check this now")
    if (io.clients[user2id])
        socketIo.notification(user2id, "You got a match, check this now")
}

socketIo.listen= (app) => {
    
    io = socketio.listen(app)
    
    io.use(function(socket, next){
        socketIo.sessionMiddleware(socket.request, socket.request.res || {}, next)
    })
// !!!! remove console.log
    io.on("connection", (socket)=>{
        console.log("someone connected")
        io.clients[socket.request.session.user] = socket
        socketIo.notification(socket.request.session.user, "salut vous vous etez bien connecter")
        userDB.updateConnection(socket.request.session.user, true)
        
        socket.on("disconnect", ()=>{
            io.clients[socket.request.session.user] = null;
            userDB.updateConnection(socket.request.session.user, false)
            .then(data => console.log("someone disconnected"))
            .catch(err => console.log(err))
        })
        
        socket.on("notifications", (message) => {
            console.log(message)
            socketIo.notification(socket.request.session.user, "nous avons bien recus : " + message)
            socketIo.notification(1, "salut , tu me recois ?")
        })
    })
    return io;
}

module.exports = socketIo