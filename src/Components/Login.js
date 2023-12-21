import React, { useState, useEffect } from 'react';
import './ComponentsCss/LoginCss.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MyIconButton from './MyIconButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import sendCryptedData from './StaticFunctions/SendingCryptedDataToServer';
const generateKeys = require('./CryptoFront/generateClientKeys');
const {
  checkEmail,
  checkPassword,
} = require('./StaticFunctions/HandleLoginRegisterForms');

function Login() {
  const [readPassword, setReadPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState([]);
  const [serverPubKey, setServerPubKey] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

    if(localStorage.getItem('rsaKeys_pubKey') == null || localStorage.getItem('rsaKeys_priKey') == null){
      const keys = generateKeys();
      localStorage.setItem('rsaKeys_pubKey', JSON.stringify(keys.publicKey));
      localStorage.setItem('rsaKeys_priKey', JSON.stringify(keys.privateKey));
    }

    const fetchData = async () => {
      if(localStorage.getItem('A_Server_pubKey') == null) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_URL}/getServerPubKey`);
          setServerPubKey(response.data);
          localStorage.setItem('A_Server_pubKey', response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      else {
        setServerPubKey(localStorage.getItem('A_Server_pubKey'))
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let errorsMap = [];

      if (!checkEmail(email))
        errorsMap.push(
          'Use email format and only alpha numeric characters and `- _`'
        );
      if (!checkPassword(password))
        errorsMap.push(
          'Your password length needs to be more than 8 characters, without extra characters. At least 2 upper letters, at least 3 lower case, at least 2 numbers. `_ -` allowed'
        );

      if (errorsMap.length === 0) {
        const data = {
          email : email,
          password : password
        }
        let response = await sendCryptedData("post", data, `${process.env.REACT_APP_URL}/user/login`, serverPubKey);
        let res = response.status;
        if (res === 200) {
          localStorage.setItem('A_JWT', response.data)
          navigate('/app');
          return;
        } else if (res === 507) {
          errorsMap.push('Error while crypting data');
        } else if (res === 506) {
          errorsMap.push('Error while sending data');
        } else if (res === 401) {
          errorsMap.push('Please double-check your password');
        } else if (res === 404) {
          errorsMap.push('Please double-check your credentials');
        } else if (res === 500) {
          errorsMap.push('Server Error while checking information');
        } else {
          errorsMap.push('Status not acceptable ' + res);
        }

        setFormErrors(errorsMap);
      } else {
        setFormErrors(errorsMap);
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
    } finally {
      // Clear form errors after 5 seconds
      await new Promise((resolve) => setTimeout(resolve, 5000));
      setFormErrors([]);
    }
  };

  return (
    <div className='Login'>
      {formErrors.length === 0 ? (
        <div className="Login-A">A</div>
      ) : (
        <div className="Login-Error">
          <div className="WriteError">{formErrors[0]}</div>
        </div>
      )}
      <div className='Login-Form'>
        <div className='Login-Form-Formulaire'>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className='Login-Form-Formulaire-UserName'
              placeholder='email'
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <br />
            <div className="Login-Form-Formulaire-Password-Div">
              <input
                type={readPassword ? 'text' : 'password'}
                className='Login-Form-Formulaire-Password'
                placeholder='password'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <div
                className="VisibilityIcon"
                onClick={() => {
                  setReadPassword(!readPassword);
                }}
              >
                <MyIconButton
                  icon={VisibilityIcon}
                  color="#d4d4dc"
                  fontSize={30}
                />
              </div>
            </div>
            <br />
            <button className="Login-Form-Formulaire-Submit">Login A...</button>
          </form>
          <button className="Login-Google" onClick = {() => {navigate('/Register')}}>I don't have account</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
