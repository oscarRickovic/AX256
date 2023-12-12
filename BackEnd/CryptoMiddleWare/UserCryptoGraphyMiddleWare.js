const {encrypt, decrypt} = require('../Crypto/AsymCrypto');
const sym = require('../Crypto/SymCrypto');
const dotenv = require('dotenv');
const keysJson = require('../Crypto/Keys.json');
dotenv.config();
const getUserRegister = (req) => {
let clientPubKey = req.body.clientPubKey;
  let data = req.body.data;
  let clearPrivateKey = sym.decrypt(keysJson.privateKey, process.env.SERVER_SECRET_KEY);
  let clearData = decrypt(data, clearPrivateKey).split("00000000");
  return {...clearData}
}

module.exports = getUserRegister