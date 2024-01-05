const onDisconnect = (socket) => {
    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnected');
    });
}

module.exports = onDisconnect;  