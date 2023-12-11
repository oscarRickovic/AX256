import React, { useState, useEffect } from 'react';
import './ComponentsCss/RegisterCss.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MyIconButton from './MyIconButton';
import { useNavigate } from 'react-router-dom';
import generateKeys from './CryptoFront/generateClientKeys';
const {checkUserName,
      checkEmail,
      checkPassword,
      checkConfirmationPassword} = require('./StaticFunctions/HandleLoginRegisterForms');

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [readPassword, setReadPassword] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    console.log('lets create pub key and private key');
    //const keys = generateKeys();
    //localStorage.setItem('rsaKeys_pubKey', JSON.stringify(keys.publicKey));
    //localStorage.setItem('rsaKeys_priKey', JSON.stringify(keys.privateKey));
    //console.log('get keys');
    //console.log(localStorage.getItem('rsaKeys_pubKey'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorsMap = [];
    if(!checkUserName(username)) errorsMap.push("the length of username must be more than 4 characters, without extra characters, only alpha numeric and `- _` ");
    if(!checkEmail(email)) errorsMap.push("use email format and use only alpha numeric characters and `- _`");
    if(!checkPassword(password)) errorsMap.push("your password length need to be more than 8 characters, without extra characters at least 2 upper letters, at least 3 lower case, at least 2 numbers, `_ -` allowed");
    if(!checkConfirmationPassword(password, confirmPassword)) errorsMap.push("please double check password confirmation");
    if(errorsMap.length == 0) {
      navigate('/app');
    }
    else {
      setFormErrors(errorsMap);
      await new Promise(resolve => setTimeout(resolve, 10000));
      setFormErrors([])
    }
  };

  return (
    <div className="Login">
      {formErrors.length == 0 ?
        <div className="Login-A">A</div>
        :
        <div className="Login-Error"><div className = "WriteError">{formErrors[0]}</div></div>
      }
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
                type={readPassword ? "text" : "password"}
                className="Login-Form-Formulaire-Password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="VisibilityIcon" onClick={()=>{setReadPassword(!readPassword)}}>
                <MyIconButton icon={VisibilityIcon} color="#d4d4dc" fontSize={30}/>
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
