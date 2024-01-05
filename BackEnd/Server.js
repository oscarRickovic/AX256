// imported libraries.
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const cors = require('cors');
const connectDb = require('./ConnectDB');
const socketIo = require('./Socket/SocketIo');
const keysJson = require('./Crypto/Keys.json');

// Routers.
const usersRoutes = require('./routes/users')
const preUsersRoutes = require('./routes/preUser')
const imageRoutes = require('./routes/image')
const messageRoutes = require('./routes/message')

// MiddleWares imports.

const {checkUserJwt} = require('./MiddleWare/checkUserJWT');

// configs.
app.use(cors());
dotenv.config() ;


// socket io.
const io = require('socket.io')(process.env.PORT_SOCKET_IO, {
  cors : {
      origin: "*"
  }
});


// middleware
app.use(express.json())

app.get('/getServerPubKey', (req, res)=>{
  res.send(keysJson.publicKey);
})

app.use('/preUser', preUsersRoutes)

app.use('/user', usersRoutes)

// For all access we need to check your JWT :
app.use('/image', checkUserJwt ,imageRoutes);
app.use('/message', checkUserJwt, messageRoutes)
app.get('/ownInformations', checkUserJwt, (req, res) => {
  return res.status(200).json(req.customData.user);
})

// Start Server:
connectDb(app, mongoose, io, socketIo);