const forge = require('node-forge');

const encrypt = (plainText, publicKey) => {
  plainText = JSON.stringify(plainText);
  const publicKeyObject = forge.pki.publicKeyFromPem(publicKey);
  const encrypted = publicKeyObject.encrypt(plainText, 'RSA-OAEP', {
    md: forge.md.sha256.create(),
  });

  return forge.util.encode64(encrypted);
};

const decrypt = (cipherText, privateKey) => {
  const privateKeyObject = forge.pki.privateKeyFromPem(privateKey);
  const decrypted = privateKeyObject.decrypt(forge.util.decode64(cipherText), 'RSA-OAEP', {
    md: forge.md.sha256.create(),
  });

  return JSON.parse(decrypted);
};



module.exports = {encrypt, decrypt}
