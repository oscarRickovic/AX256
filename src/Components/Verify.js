import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import sendCryptedData from './StaticFunctions/SendingCryptedDataToServer';
import { checkCode } from './StaticFunctions/HandleLoginRegisterForms';
import { generateClientKeys } from './CryptoFront/generateClientKeys';
import './ComponentsCss/VerifyCss.css';

function Verify() {
  const [code, setCode] = useState('');
  const [error, setError] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sendCryptedData('GET', `${process.env.REACT_APP_URL}/getServerPubKey`);
        localStorage.setItem('A_Server_pubKey', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (!localStorage.getItem('A_Server_pubKey')) {
      fetchData();
    }

    if (!localStorage.getItem('A_JWT')) {
      navigate('/Register');
    }

    if (!localStorage.getItem('rsaKeys_pubKey') || !localStorage.getItem('rsaKeys_priKey')) {
      const keys = generateClientKeys();
      localStorage.setItem('rsaKeys_pubKey', JSON.stringify(keys.publicKey));
      localStorage.setItem('rsaKeys_priKey', JSON.stringify(keys.privateKey));
    }
  }, [navigate]); // Include navigate in the dependency array

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!checkCode(code)) {
      setError(-1);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setError(0);
    } else {
      // Code format is good, send data
      const data = {
        code : code
      }
      let response = await sendCryptedData("post" , `${process.env.REACT_APP_URL}/preUser/checkUserJwt`, data);
      let res = response.status;
      if(res == 200) {
        setError(1);
        navigate('/app');
      }
      else {
        setError(-1);
      }
      
    }
  };

  return (
    <div className="Verify">
      <div className="Verify-twoDivs">
        <div className="A">A</div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <table className="table">
              <tbody>
                <tr className="tr">Email Verification code :</tr>
                <tr className="tr">
                  <input
                    type="text"
                    className={`input ${error === -1 ? 'inputError' : error === 0 ? 'inputNormal' : 'inputSuccess'}`}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </tr>
                <tr className="tr">
                  <button className="button" type="submit">
                    Verify
                  </button>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Verify;
