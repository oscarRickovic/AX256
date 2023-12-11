import React, { useEffect, useState } from 'react'
import './ComponentsCss/LoginCss.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import MyIconButton from './MyIconButton';
import { useNavigate } from "react-router-dom";
import generateKeys from './CryptoFront/generateClientKeys'
function Login() {
    const [readPassword, setReadPassword] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        console.log('lets create pub key and private key');
        //const keys = generateKeys();
        //localStorage.setItem('rsaKeys_pubKey', JSON.stringify(keys.publicKey));
        //localStorage.setItem('rsaKeys_priKey', JSON.stringify(keys.privateKey));
        //console.log('get keys');
        //console.log(localStorage.getItem('rsaKeys_pubKey'))
    },[])
  return (
    <div className='Login'>
        <div className='Login-A'>
            A
        </div>
        <div className = 'Login-Form'>
            <div className='Login-Form-Formulaire'>
                <form onSubmit={()=>{navigate('/app')}}>
                    <input type="text" className='Login-Form-Formulaire-UserName' placeholder='username'/>
                    <br/>
                    <div className = "Login-Form-Formulaire-Password-Div">
                        <input type={readPassword ? "text" : "password"} className='Login-Form-Formulaire-Password' placeholder='password'/>
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