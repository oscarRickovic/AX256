import axios from 'axios';
const { encrypt } = require('../CryptoFront/cryptageRSA');

const sendCryptedData = async (type, data, link, serverPubKey = localStorage.getItem('A_Server_pubKey')) => {
  try {
    if (!serverPubKey) {
      return 507;
    }
    const pairInfos = {
      data: encrypt(data, serverPubKey),
      clientPubKey: localStorage.getItem('rsaKeys_pubKey'),
      token: localStorage.getItem('A_JWT')
    };
    if(type.toUpperCase() === "GET") {
      return await axios.get(link, {
        headers: {
          'A_JWT': localStorage.getItem('A_JWT')
        }})
    }
    else if (type.toUpperCase() === "POST") {
      return await axios.post(link, pairInfos,{
        headers: {
          'A_JWT': localStorage.getItem('A_JWT')
        }})
    }
    else if(type.toUpperCase() === "UPDATE" || type.toUpperCase() === "PATCH"){
      return await axios.patch(link, pairInfos, {
        headers: {
          'A_JWT': localStorage.getItem('A_JWT')
        }})
    }
    else if (type.toUpperCase() === "DELETE"){
      return await axios.delete(link, {
        headers: {
          'A_JWT': localStorage.getItem('A_JWT')
        }})
    }
  } catch (error) {
    return error.response;
  }
};

export default sendCryptedData;
