const onSendMsg = require('./OnSendMsg');
const onJoinRooms =  require('./OnJoinRoons');
const onDisconnect = require('./OnDisconnect');
const setLine = require('./setLine');
const socketIo = (io) => {
    io.on('connection', (socket) => {
        console.log(socket.id + " is connected");

        onSendMsg(socket);

        // Online
        setLine(socket, true);
        
        // OffLine
        setLine(socket, false);
        
        onJoinRooms(socket);
        
        onDisconnect(socket);
      });
}
module.exports = socketIo;