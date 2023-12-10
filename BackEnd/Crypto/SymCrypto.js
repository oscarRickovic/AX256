const crypto = require('crypto-js');
const encrypt = (inputString, key) => {
  const encryptedString = crypto.AES.encrypt(inputString, key).toString();
  return encryptedString;
};
const decrypt = (encryptedString, key) => {
  const decryptedBytes = crypto.AES.decrypt(encryptedString, key);
  const decryptedString = decryptedBytes.toString(crypto.enc.Utf8);
  return decryptedString;
};

module.exports = {encrypt, decrypt}
