const onJoinRooms = (socket) => {
    socket.on('join-rooms', (rooms) =>{
        for(let i =0; i < rooms.length; i++) {
          socket.join(rooms[i]);
          //console.log(`socket with id : ${socket.id} has joined room ${rooms[i]}`)
        }
      })
}

module.exports = onJoinRooms;