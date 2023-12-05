import React from 'react'
import './ComponentsCss/LoginCss.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import MyIconButton from './MyIconButton';
//import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
function Login() {
  return (
    <div className='Login'>
        <div className='Login-A'>
            A
        </div>
        <div class = 'Login-Form'>
            <div className='Login-Form-Formulaire'>
                <form>
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