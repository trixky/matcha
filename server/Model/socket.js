const socketio = require("socket.io")
const session = require("express-session")
const userDB  = require("../database/controllers/userDB")
const utils = require("../Model/utils")

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
    const time = utils.getDate();
    // console.log("sending message")
    if (io.clients[id])
        io.clients[id].emit('messages', {sender: sender, message: message, created :time,  notification: sender + " send you : " + message})
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
        var id = socket.request._query['id'];
        if (id === undefined)
            return;
        // console.log("someone connected")
        // console.log(id)
        io.clients[id] = socket
        //socketIo.notification(id, "hello, you are connected to server with id = " + id)
        userDB.updateConnection(id, true)
        .catch(err => err)
        
        socket.on("disconnect", ()=>{
            var id = socket.request._query['id'];
            if (id === undefined)
                return;
            // console.log("the id is =" + id)
            io.clients[id] = null;
            userDB.updateConnection(id, false)
            // .then(data => console.log("someone disconnected"))
            .catch(err => err)
        })
        
        socket.on("notifications", (message) => {
            var id = socket.request._query['id'];
            // console.log(message)
            //socketIo.notification(id, "this have been well received : " + message)
            //socketIo.notification(1, "over")
        })
    })
    return io;
}

module.exports = socketIo
