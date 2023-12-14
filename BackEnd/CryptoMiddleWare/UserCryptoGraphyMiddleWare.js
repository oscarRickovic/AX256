const {encrypt, decrypt} = require('../Crypto/AsymCrypto');
const sym = require('../Crypto/SymCrypto');
const dotenv = require('dotenv');
const keysJson = require('../Crypto/Keys.json');
const hashWithKey = require('../Crypto/HashWithSymKey');
dotenv.config();

const clearDatafnct  = (req) => {
  let data = req.body.data;
  let clearPrivateKey = sym.decrypt(keysJson.privateKey, process.env.SERVER_SECRET_KEY);
  let clearData = decrypt(data, clearPrivateKey).split("00000000");
  return clearData;
}

const getUserRegister = (req) => {
  let clearData = clearDatafnct(req);
  clearData[2] = hashWithKey(clearData[2], process.env.SERVER_SECRET_KEY);
  return clearData;
}

const getUserLogin = (req) => {
  let clearData = clearDatafnct(req);
  clearData[1] = hashWithKey(clearData[1], process.env.SERVER_SECRET_KEY);
  return clearData;
}

module.exports = {getUserRegister,getUserLogin, clearDatafnct}