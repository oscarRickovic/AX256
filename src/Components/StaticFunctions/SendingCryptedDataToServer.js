import axios from 'axios';
import SendDataError from '../Errors/SendDataError';
const { encrypt } = require('../CryptoFront/cryptageRSA');

const sendCryptedData = async (type, link, data = null) => {
  let serverPubKey = localStorage.getItem('A_Server_pubKey');
  try {
    const headers = {
      'A_JWT': localStorage.getItem('A_JWT'),
      'CLIENT_PUBLIC_KEY' : localStorage.getItem('rsaKeys_pubKey')
    }
    if(type.toUpperCase() == "GET") { 
      return await axios.get(link, {headers: headers})
    }
    else if(type.toUpperCase() == "POST" || type.toUpperCase() == "UPDATE" || type.toUpperCase() == "PATCH"){
      if(data == null) {
        throw new SendDataError(403, "Null Data to Send");
      }
      const pairInfos = {
        data: encrypt(data, serverPubKey)
      };
      if(type.toUpperCase() == "POST") {
        let res = await axios.post(link, pairInfos,{headers: headers});
        console.log(res);
        return res;
      }
      else {
        return await axios.patch(link, pairInfos, {headers: headers})
      }
    }
    else if (type.toUpperCase() == "DELETE"){
      return await axios.delete(link, {
        headers: headers
      })
    }

  } catch (error) {
    console.log(error)
    return error.response;
  }
};

export default sendCryptedData;
