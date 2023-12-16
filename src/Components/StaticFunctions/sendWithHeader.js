import axios from 'axios';

// link that we will send to.
// data that we want to send if its null then its get method and if its not null we send a clear data.
const sendWithHeader = async (link, data) => {
    const config = {
        headers: {
          'A_JWT': localStorage.getItem('A_JWT'),
          'Content-Type': 'application/json'
        },
      };
    
    try {
        let response;
        if(data == null) {
            response = await axios.get(link, config);
        } else {
            const pairInfos = {
                data : data,
                token : localStorage.getItem('A_JWT') 
            }
            response = await axios.post(link, pairInfos);
        }
        return {
            status : response.status, 
            data : response.data
        }
    } catch(e) {
        return {
            status : e.response.status,
            data : "error while getting response"
        }
    }
}   