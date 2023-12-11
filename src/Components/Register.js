import React, { useState, useEffect } from 'react';
import './ComponentsCss/RegisterCss.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MyIconButton from './MyIconButton';
import { useNavigate } from 'react-router-dom';
import generateKeys from './CryptoFront/generateClientKeys';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    console.log('lets create pub key and private key');
    //const keys = generateKeys();
    //localStorage.setItem('rsaKeys_pubKey', JSON.stringify(keys.publicKey));
    //localStorage.setItem('rsaKeys_priKey', JSON.stringify(keys.privateKey));
    //console.log('get keys');
    //console.log(localStorage.getItem('rsaKeys_pubKey'));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/app');
  };

  return (
    <div className="Login">
      <div className="Login-A">A</div>
      <div className="Login-Form">
        <div className="Login-Form-Formulaire">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="Login-Form-Formulaire-UserName"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              className="Login-Form-Formulaire-UserName"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="Login-Form-Formulaire-Password-Div">
              <input
                type="password"
                className="Login-Form-Formulaire-Password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="VisibilityIcon">
                <MyIconButton icon={VisibilityIcon} color="#d4d4dc" fontSize={30} />
              </div>
            </div>
           <div className='confirmingPassword'>
                <input
                    type="password"
                    className="Login-Form-Formulaire-Password"
                    placeholder="confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
