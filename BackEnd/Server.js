const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const generateServerKeys = require('./Crypto/ServerKeys');
const keysJson = require('./Crypto/Keys.json');
dotenv.config() ;
const PORT = process.env.PORT_BACK || 6000;
const usersRoutes = require('./routes/users')
const cors = require('cors');
app.use(cors());


// middleware
app.use(express.json())

app.get('/getServerPubKey', (req, res)=>{
  res.send(keysJson.publicKey);
})

app.use('/user', usersRoutes)

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