const socketio = require("socket.io")


module.exports.listen = function(app){
    var io = socketio.listen(app)

    io.on("connection", (socket)=>{
    })
    return io;
};