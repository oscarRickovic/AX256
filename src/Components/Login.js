import React, { useEffect } from 'react'
import './ComponentsCss/LoginCss.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import MyIconButton from './MyIconButton';
import { useNavigate } from "react-router-dom";
//import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
function Login() {
    const navigate = useNavigate();
    useEffect(()=>{
        console.log('lets create pub key and private key');
        localStorage.setItem('oscar', "abdelhadiAgourzam");
        console.log("the champion is " + localStorage.getItem('oscar'))
    })
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
                        <input type="password" className='Login-Form-Formulaire-Password' placeholder='password'/>
                        <div className = "VisibilityIcon">
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