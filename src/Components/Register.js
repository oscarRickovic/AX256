import React, { useState, useEffect } from 'react';
import './ComponentsCss/RegisterCss.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MyIconButton from './MyIconButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const generateKeys = require('./CryptoFront/generateClientKeys');
const { encrypt, decrypt } = require('./CryptoFront/cryptageRSA');
const {
  checkUserName,
  checkEmail,
  checkPassword,
  checkConfirmationPassword,
} = require('./StaticFunctions/HandleLoginRegisterForms');

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [readPassword, setReadPassword] = useState(false);
  const [formErrors, setFormErrors] = useState([]);
  const [serverPubKey, setServerPubKey] = useState(null);
  const [dataToServer, setDataToServer] = useState(null);

  useEffect(() => {
    const keys = generateKeys();
    localStorage.setItem('rsaKeys_pubKey', JSON.stringify(keys.publicKey));
    localStorage.setItem('rsaKeys_priKey', JSON.stringify(keys.privateKey));
    console.log('generate pub key');
    console.log(localStorage.getItem('rsaKeys_pubKey'));

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getServerPubKey');
        setServerPubKey(response.data);
        console.log(serverPubKey.serverPubKey);
      } catch (error) {
        console.error('Error fetching data:' + error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errorsMap = [];

    if (!checkUserName(username))
      errorsMap.push(
        'the length of username must be more than 4 characters, without extra characters, only alpha numeric and `- _` '
      );
    if (!checkEmail(email))
      errorsMap.push(
        'use email format and use only alpha numeric characters and `- _`'
      );
    if (!checkPassword(password))
      errorsMap.push(
        'your password length needs to be more than 8 characters, without extra characters at least 2 upper letters, at least 3 lower case, at least 2 numbers, `_ -` allowed'
      );
    if (!checkConfirmationPassword(password, confirmPassword))
      errorsMap.push('please double-check password confirmation');

    if (errorsMap.length === 0) {
      let data = [username, email, password];
      let result = data.join('00000000');
      console.log(result)
      console.log(serverPubKey);
      const pairInfos = {
        data : encrypt(data, serverPubKey),
        clientPubKey : localStorage.getItem('rsaKeys_pubKey')
      }
      if (serverPubKey != null) {
        const pairInfos = {
          data: encrypt(result, serverPubKey),
          clientPubKey: localStorage.getItem('rsaKeys_pubKey'),
        };
  
        try {
          await axios.post('http://localhost:5000/user', pairInfos);
          console.log('Data sent successfully!');
        } catch (e) {
          console.log('Error while sending data:', e);
        }
      } else {
        console.log('No operations with null server pub key');
      }
    } else {
      setFormErrors(errorsMap);
      await new Promise((resolve) => setTimeout(resolve, 10000));
      setFormErrors([]);
    }
  };

  return (
    <div className="Login">
      {formErrors.length === 0 ? (
        <div className="Login-A">A</div>
      ) : (
        <div className="Login-Error">
          <div className="WriteError">{formErrors[0]}</div>
        </div>
      )}
      <div className="Login-Form">
        <div className="Login-Form-Formulaire">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="Login-Form-Formulaire-UserName"
              placeholder="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <input
              type="text"
              className="Login-Form-Formulaire-UserName"
              placeholder="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
            <div className="Login-Form-Formulaire-Password-Div">
              <input
                type={readPassword ? 'text' : 'password'}
                className="Login-Form-Formulaire-Password"
                placeholder="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
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
            <div className="confirmingPassword">
              <input
                type="password"
                className="Login-Form-Formulaire-Password"
                placeholder="confirm password"
                value={confirmPassword}
                onChange={({ target }) => setConfirmPassword(target.value)}
              />
            </div>
            <button className="Login-Form-Formulaire-Submit">Register</button>
          </form>
          <button className="Login-Google">Use Google</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
