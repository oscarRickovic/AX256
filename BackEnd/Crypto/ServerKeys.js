const generateRSAKeys = require('./KeysGenerator');
const {encrypt , decrypt} = require('./SymCrypto');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config() ;
const generateServerKeys = () => {
    const keysObject = generateRSAKeys();
    const encryptPrivateServerKey = encrypt(keysObject.privateKey, process.env.SERVER_SECRET_KEY);
    keysObject.privateKey = encryptPrivateServerKey;
    fs.writeFileSync('./BackEnd/Crypto/Keys.json', JSON.stringify(keysObject, null, 2), 'utf8');
};
module.exports = generateServerKeys;