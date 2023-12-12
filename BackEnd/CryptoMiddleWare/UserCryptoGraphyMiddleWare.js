const {encrypt, decrypt} = require('../Crypto/AsymCrypto');
const sym = require('../Crypto/SymCrypto');
const getCryptedRegisteringInformationFromClient = (req) => {
    let clientPubKey = req.body.clientPubKey;
    let data = req.body.data;
    console.log(data);
    let clearPrivateKey = sym.decrypt(keysJson.privateKey, process.env.SERVER_SECRET_KEY);
    let clearData = decrypt(data, clearPrivateKey).split("00000000");
    return {...clearData}
}

module.exports = {getCryptedRegisteringInformationFromClient}