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

//routes
app.use('/users', usersRoutes)

app.get('/', (req, res)=>{
  // In this step we should return the server public key that is stored in keys.json.
  res.status(200).json(keysJson.publicKey);
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