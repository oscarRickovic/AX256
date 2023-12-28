import axios from 'axios';
import SendDataError from '../Errors/SendDataError';
const { encrypt } = require('../CryptoFront/cryptageRSA');

const sendCryptedData = async (type, link, data = null) => {
  let serverPubKey = localStorage.getItem('A_Server_pubKey');
  try {
    if (!serverPubKey) {
      throw new SendDataError(404, "No Server Public Key is selected");
    }
    const headers = {
      'A_JWT': localStorage.getItem('A_JWT'),
      'CLIENT_PUBLIC_KEY' : localStorage.getItem('rsaKeys_pubKey')
    }
    if(type.toUpperCase() === "GET") { 
      return await axios.get(link, {headers: headers})
    }
    else if(type.toUpperCase() === "POST" || type.toUpperCase() === "UPDATE" || type.toUpperCase() === "PATCH"){
      if(data == null) {
        throw new SendDataError(403, "Null Data to Send");
      }
      const pairInfos = {
        data: encrypt(data, serverPubKey)
      };
      if(type.toUpperCase() === "POST") {
        return await axios.post(link, pairInfos,{headers: headers})
      }
      else {
        return await axios.patch(link, pairInfos, {headers: headers})
      }
    }
    else if (type.toUpperCase() === "DELETE"){
      return await axios.delete(link, {
        headers: headers
      })
    }

  } catch (error) {
    return error.response;
  }
};

export default sendCryptedData;
