const {encrypt, decrypt} = require('./AsymCrypto');
const sym = require('./SymCrypto');
const dotenv = require('dotenv').config();
const keys = require('../Crypto/Keys.json');
let code = "abdelhadi00000000abdelhadi@gmail.com00000000ABDabd123";
let serverPrivateKey = sym.decrypt(keys.privateKey, process.env.SERVER_SECRET_KEY)
let value = encrypt(code, keys.publicKey);
console.log(value)
console.log(decrypt(value, serverPrivateKey));