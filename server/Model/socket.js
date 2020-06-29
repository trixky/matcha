const socketio = require("socket.io")
const session = require("express-session")
const userDB  = require("../database/controllers/userDB")

var io
var socketIo = {}

socketIo.sessionMiddleware = session({
    saveUninitialized: false,
    secret: 'session_secret',
    cookie: { maxAge: 8*60*60*1000 },
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
        io.clients[id].emit('messages', {sender: sender, message: message, notification: sender + " send you : " + message})
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
        socketIo.notification(socket.request.session.user, "hello, you are connected to server")
        userDB.updateConnection(socket.request.session.user, true)
        
        socket.on("disconnect", ()=>{
            io.clients[socket.request.session.user] = null;
            userDB.updateConnection(socket.request.session.user, false)
            .then(data => console.log("someone disconnected"))
            .catch(err => console.log(err))
        })
        
        socket.on("notifications", (message) => {
            console.log(message)
            socketIo.notification(socket.request.session.user, "this have been well received : " + message)
            socketIo.notification(1, "over")
        })
    })
    return io;
}

module.exports = socketIo