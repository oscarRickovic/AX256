import React, { useEffect, useState } from 'react'
import './ComponentsCss/LoginCss.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import MyIconButton from './MyIconButton';
import { useNavigate } from "react-router-dom";
import generateKeys from './CryptoFront/generateClientKeys'
import sendCryptedData from './StaticFunctions/SendingCryptedDataToServer';
import axios from 'axios';
const {checkEmail,
      checkPassword} = require('./StaticFunctions/HandleLoginRegisterForms');
function Login() {
    const [readPassword, setReadPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formErrors, setFormErrors] = useState([]);
    const [serverPubKey, setServerPubKey] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
        const keys = generateKeys();
        localStorage.setItem('rsaKeys_pubKey', JSON.stringify(keys.publicKey));
        localStorage.setItem('rsaKeys_priKey', JSON.stringify(keys.privateKey));
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
    },[])


    const handleSubmit = async (e) => {
        e.preventDefault();
        let errorsMap = [];
        if(!checkEmail(email)) errorsMap.push("use email format and use only alpha numeric characters and `- _`");
        if(!checkPassword(password)) errorsMap.push("your password length need to be more than 8 characters, without extra characters at least 2 upper letters, at least 3 lower case, at least 2 numbers, `_ -` allowed");
        if(errorsMap.length == 0) {
            let res = await sendCryptedData([email, password], "http://localhost:5000/user/login", serverPubKey);
            console.log(res)
            if(res == 200) {
                navigate('/app');
                return;
              }
              else if(res == 507) {
                errorsMap.push("Error while crypting data");
              }
              else if(res == 506) {
                errorsMap.push("Error while sending data");
              }
              else if(res == 401) {
                errorsMap.push("Please double check your password");
              }
              else if(res == 404) {
                errorsMap.push("Please double check your credentials");
              }
              else if (res == 500) {
                errorsMap.push("Server Error while checking informations x");
              }
              else {
                errorsMap.push("Status not acceptable " + res);
              }
              setFormErrors(errorsMap);
            
        } else {
            setFormErrors(errorsMap);
            await new Promise(resolve => setTimeout(resolve, 10000));
            setFormErrors([])
        }
      };

  return (
    <div className='Login'>
        {formErrors.length == 0 ?
            <div className="Login-A">A</div>
            :
            <div className="Login-Error"><div className = "WriteError">{formErrors[0]}</div></div>
        }
        <div className = 'Login-Form'>
            <div className='Login-Form-Formulaire'>
                <form onSubmit={handleSubmit}>
                    <input type="text" className='Login-Form-Formulaire-UserName' placeholder='email' onChange={(e)=>{setEmail(e.target.value)}}/>
                    <br/>
                    <div className = "Login-Form-Formulaire-Password-Div">
                        <input type={readPassword ? "text" : "password"} className='Login-Form-Formulaire-Password' placeholder='password' onChange={(e)=>{setPassword(e.target.value)}}/>
                        <div className = "VisibilityIcon" onClick = {()=>{setReadPassword(!readPassword)}}>
                            <MyIconButton  icon = {VisibilityIcon} color = "#d4d4dc" fontSize = {30}/>
                        </div>
                    </div>
                    <br/>
                    <button className="Login-Form-Formulaire-Submit">Login A...</button>
                </form>
                <button className="Login-Google">Use Google</button>
            </div>
        </div>
    </div>
  )
}

export default Login