const express = require('express');
const app = express();
const dotenv = require('dotenv');
const generateServerKeys = require('./Crypto/ServerKeys');
dotenv.config() ;
const PORT = process.env.PORT_BACK || 6000;
app.listen(PORT,()=>{
    // Before the server start running it should create pub key and private key.
    // the pub key and crypted private key should be stored on a json file named 'KEYS.JSON'.
    generateServerKeys();
    console.log(`server start on ${PORT}`)
})