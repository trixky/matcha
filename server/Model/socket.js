const socketio = require("socket.io")
const {sessionMiddleware} = require("../app")
const userDB  = require("../database/controllers/userDB")

var io
var socketIo = {}


socketIo.notification = (id, message)=>{
    io.clients[id].emit('notification', message)
}

socketIo.listen= (app) => {
    io = socketio.listen(app)
    
    io.use(function(socket, next){
        sessionMiddleware(socket.request, socket.request.res || {}, next)
    })

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
        
        socket.on("notification", (message) => {
            console.log(message)
            io.emit("notification", "nous avons bien recus : " + message)
            socketIo.notification(1, "salut , tu me recois ?")
        })
    })
    return io;
}



module.exports = socketIo