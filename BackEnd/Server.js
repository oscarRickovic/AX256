// imported libraries.
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const cors = require('cors');

// crypto files.
const generateServerKeys = require('./Crypto/ServerKeys');
const keysJson = require('./Crypto/Keys.json');

// Routers.
const usersRoutes = require('./routes/users')
const preUsersRoutes = require('./routes/preUser')
const imageRoutes = require('./routes/image')

// MiddleWares imports.

const checkUserJwt = require('./MiddleWare/checkUserJWT');

// configs.
app.use(cors());
dotenv.config() ;

// used constants.
const PORT = process.env.PORT_BACK || 6000;

// socket io.

const io = require('socket.io')(7777, {
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

app.get('/ownInformations', checkUserJwt, (req, res) => {
  return res.status(200).json(req.customData.user);
})


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    io.on('connection', (socket) => {
      console.log(socket.id + " is connected");
    
      socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
      });
    
      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
    app.listen(PORT,()=>{
        // Before the server start running it should create pub key and private key.
        // the pub key and crypted private key should be stored on a json file named 'KEYS.JSON'.
        
        // I commited the function because each time saving this file it will generate other keys and that will always take some time.
        //generateServerKeys();
        console.log(`server start on ${PORT}`)
    })
  })
  .catch((err) => {
    console.log(err)
}) 