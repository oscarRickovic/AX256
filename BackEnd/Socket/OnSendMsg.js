// message Controller:
const msgController = require('../controllers/messageController');

const onSendMsg = (socket) => {
    socket.on('sendMsg', async (message, room, token) => {
        if(room == "" || room == null) {
          // nothing to do.
        }
        else {
          //console.log(`${socket.id} has send ${message} to ${room}`)
          if(message != null && message != ""){
            const user = await msgController.checkJWT(token);
            if(user == null) return;
            const newMessage = await msgController.createMessage(user._id, room, message);
            if(newMessage == 200) {
              socket.to(room).emit('receiveMsg',{
                room : room,
                msg : message
              });
            } 
          }
        }
    })
}

module.exports = onSendMsg;