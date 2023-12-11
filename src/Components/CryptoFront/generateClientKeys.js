const NodeRSA = require('node-rsa');
const generateClientKeys = () => {
  const key = new NodeRSA({ b: 2048 });
  const publicKey = key.exportKey('pkcs1-public-pem');
  const privateKey = key.exportKey('pkcs1-private-pem');
  const keysObject = {
    publicKey,
    privateKey,
  };
  return keysObject;
};

module.exports = generateClientKeys;