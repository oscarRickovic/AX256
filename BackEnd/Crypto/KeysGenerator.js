const forge = require('node-forge');

const generateKeys = () => {
  const keyPair = forge.pki.rsa.generateKeyPair({ bits: 2048 });
  const publicKey = forge.pki.publicKeyToPem(keyPair.publicKey);
  const privateKey = forge.pki.privateKeyToPem(keyPair.privateKey);

  return { publicKey, privateKey };
};

module.exports = generateKeys;
