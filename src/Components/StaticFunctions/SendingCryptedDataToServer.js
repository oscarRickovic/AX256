import axios from 'axios';
const { encrypt } = require('../CryptoFront/cryptageRSA');

const sendCryptedData = async (data, link, serverPubKey) => {
  try {
    if (!serverPubKey) {
      console.log('No operations with null server pub key');
      return false;
    }

    const result = data.join('00000000');
    console.log(result);
    console.log(serverPubKey);

    const pairInfos = {
      data: encrypt(result, serverPubKey),
      clientPubKey: localStorage.getItem('rsaKeys_pubKey'),
    };

    const response = await axios.post(link, pairInfos);

    if (response.status === 200) {
      return true;
    } else {
      console.error('Unexpected response status:', response.status);
      return false;
    }
  } catch (error) {
    console.error('Error while sending data:', error);
    return false;
  }
};

export default sendCryptedData;
