const crypto = require('crypto-js');

// This hashing only in one way
const hashWithKey = (inputString, Key) => {
  const combinedString = inputString + Key;
  const hashedString = crypto.SHA256(combinedString).toString();
  return hashedString;
};

module.exports = hashWithKey;
