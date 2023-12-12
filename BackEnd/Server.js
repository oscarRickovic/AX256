const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const generateServerKeys = require('./Crypto/ServerKeys');
const keysJson = require('./Crypto/Keys.json');
const {encrypt, decrypt} = require('./Crypto/AsymCrypto');
const sym = require('./Crypto/SymCrypto');
const getUserRegister = require('./CryptoMiddleWare/UserCryptoGraphyMiddleWare');
dotenv.config() ;
const PORT = process.env.PORT_BACK || 6000;
const usersRoutes = require('./routes/users')
const cors = require('cors');
app.use(cors());


// middleware
app.use(express.json())

//routes
app.use('/users', usersRoutes)

// All this behaviors should be splited in other files to more organise the code.
app.get('/testCrypto', (req, res)=>{
  // In this step we should return the server public key that is stored in keys.json.
  res.send(keysJson.publicKey);
})

// This is an example of CryptoGraphy middleWare
app.post('/testCrypto', (req, res) => {
  console.log(getUserRegister(req))
})


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
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