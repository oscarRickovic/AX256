import axios from 'axios';
const { encrypt } = require('../CryptoFront/cryptageRSA');

const sendCryptedData = async (data, link, serverPubKey = localStorage.getItem('A_Server_pubKey')) => {
  try {
    if (!serverPubKey) {
      return 507;
    }
    const pairInfos = {
      data: encrypt(data, serverPubKey),
      clientPubKey: localStorage.getItem('rsaKeys_pubKey'),
      token: localStorage.getItem('A_JWT')
    };
    return await axios.post(link, pairInfos);
  } catch (error) {
    return error.response;
  }
};

export default sendCryptedData;
