const {encrypt, decrypt} = require('../Crypto/AsymCrypto');
const sym = require('../Crypto/SymCrypto');
const dotenv = require('dotenv');
const keysJson = require('../Crypto/Keys.json');
const hashWithKey = require('../Crypto/HashWithSymKey');
dotenv.config();

const clearDatafnct  = (req) => {
  let data = req.body.data;
  let clearPrivateKey = sym.decrypt(keysJson.privateKey, process.env.SERVER_SECRET_KEY);
  let clearData = decrypt(data, clearPrivateKey);
  return clearData;
}

const hashClearDataPassword = (req) => {
  let clearData = clearDatafnct(req);
  clearData.password = hashWithKey(clearData.password, process.env.SERVER_SECRET_KEY);
  return clearData;
}

module.exports = {hashClearDataPassword, clearDatafnct}
