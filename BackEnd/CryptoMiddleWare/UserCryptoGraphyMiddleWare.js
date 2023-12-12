const {encrypt, decrypt} = require('../Crypto/AsymCrypto');
const sym = require('../Crypto/SymCrypto');
const dotenv = require('dotenv');
const keysJson = require('../Crypto/Keys.json');
const hashWithKey = require('../Crypto/HashWithSymKey');
dotenv.config();
const getUserRegister = (req) => {
let clientPubKey = req.body.clientPubKey;
  let data = req.body.data;
  let clearPrivateKey = sym.decrypt(keysJson.privateKey, process.env.SERVER_SECRET_KEY);
  let clearData = decrypt(data, clearPrivateKey).split("00000000");
  // lets hash the password.
  clearData[2] = hashWithKey(clearData[2], process.env.SERVER_SECRET_KEY);
  return clearData;
}

module.exports = getUserRegister