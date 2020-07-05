import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3001";

const socket = {}

socket.connect = (id, handleNotifs, handleMessages) => {
    socket.id = id;
    socket.socketIo = socketIOClient(ENDPOINT, {query: `id=${id}`})
    socket.onMessages(handleMessages)
    socket.onNotifications(handleNotifs)
}

socket.onNotifications = (handle) => {
    socket.socketIo.on("notifications", (notification) => {
        handle(notification)
    })
}

socket.onMessages = (handle) => {
    socket.socketIo.on("messages", (data) => {
        handle(data)
    })
}

socket.disconnect = () => {
    socket.socketIo.disconnect();
}

export default socket