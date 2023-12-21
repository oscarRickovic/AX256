import React, { useState } from 'react'
import './ComponentsCss/CheckPasswordBeforeUpdateCss.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import sendCryptedData from './StaticFunctions/SendingCryptedDataToServer';
import check from './StaticFunctions/HandleLoginRegisterForms';
function CheckPasswordBeforeUpdate(props) {
  const [showPassword, setShowPasword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(0);
  const validate = async () => {
    if(!check.checkPassword(password)) {
      setError(-1);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setError(0);
      return;
    }
    const response = await sendCryptedData("post",{password : password},"http://localhost:5000/user/checkUserPassword");
    if(response.status == 200) {
      props.status();
      return;
    }
    setError(-1);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setError(0);
  }
  return (
    <div className='verifyPassword'>
      <div className={error == -1 ? "centerDivShake" : "centerDiv"}>
        <div id="A-logo">A</div>
        <div id="rightDiv">
          <div class="rightInnerDiv">Please enter your password</div>
          <div class="rightInnerDiv password-div">
            <input 
              type={showPassword? "text" : "password"} 
              className='input-password'
              style = {{border: `${error != -1 ? '' : '1px solid red'}`}}
              onChange={(e)=>{setPassword(e.target.value)}}
              />
            <div className = "Visibility-div" onClick={()=>{setShowPasword(!showPassword)}}>
              <VisibilityIcon/>
            </div>
          </div>
          <div class="rightInnerDiv">
            <button className = 'styled-button' onClick = {()=>{validate()}}>Verify</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckPasswordBeforeUpdate;