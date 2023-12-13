import React, { useState, useEffect } from 'react';
import './ComponentsCss/RegisterCss.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MyIconButton from './MyIconButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import sendCryptedData from './StaticFunctions/SendingCryptedDataToServer';
const generateKeys = require('./CryptoFront/generateClientKeys');
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

  useEffect(() => {
    const keys = generateKeys();
    localStorage.setItem('rsaKeys_pubKey', JSON.stringify(keys.publicKey));
    localStorage.setItem('rsaKeys_priKey', JSON.stringify(keys.privateKey));

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getServerPubKey');
        setServerPubKey(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let errorsMap = [];

      if (!checkUserName(username))
        errorsMap.push(
          'The length of username must be more than 4 characters, without extra characters. Only alpha numeric and `- _` allowed'
        );
      if (!checkEmail(email))
        errorsMap.push(
          'Use email format and only alpha numeric characters and `- _`'
        );
      if (!checkPassword(password))
        errorsMap.push(
          'Your password length needs to be more than 8 characters, without extra characters. At least 2 upper letters, at least 3 lower case, at least 2 numbers. `_ -` allowed'
        );
      if (!checkConfirmationPassword(password, confirmPassword))
        errorsMap.push('Please double-check password confirmation');

      if (errorsMap.length === 0) {
        let res = await sendCryptedData([username, email, password], 'http://localhost:5000/user', serverPubKey);

        switch (res) {
          case 200:
            alert(localStorage.getItem('A_JWT'));
            navigate('/app');
            break;
          case 507:
            errorsMap.push('Error while crypting data');
            break;
          case 506:
            errorsMap.push('Error while sending data');
            break;
          case 500:
            errorsMap.push('Error while server is checking data');
            break;
          case 404:
            errorsMap.push('Please use another email, this one is already used');
            break;
          default:
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
                onClick={() => setReadPassword(!readPassword)}
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
