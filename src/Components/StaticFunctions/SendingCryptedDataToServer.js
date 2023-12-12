import axios from 'axios';
const { encrypt } = require('../CryptoFront/cryptageRSA');

const sendCryptedData = async (data, link, serverPubKey) => {
  try {
    if (!serverPubKey) {
      return 507;
    }
    const result = data.join('00000000');
    const pairInfos = {
      data: encrypt(result, serverPubKey),
      clientPubKey: localStorage.getItem('rsaKeys_pubKey'),
    };
    const response = await axios.post(link, pairInfos);
    localStorage.setItem('A_JWT', response.data)
    return response.status;
  } catch (error) {
    return error.response.status;
  }
};

export default sendCryptedData;
