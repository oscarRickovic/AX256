import React, { useState } from 'react';
import './ComponentsCss/VerifyCss.css';
const check = require('./StaticFunctions/HandleLoginRegisterForms');

function Verify() {
    const [code, setCode] = useState('');
    const [error, setError] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setError(!check.checkCode(code));
    };

  return (
    <div className="Verify">
      <div className="Verify-twoDivs">
        <div className="A">A</div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <table className="table">
              <tr className='tr'>Email Verification code :</tr>
              <tr className='tr'>
                <input type="text" className = {error ? "input inputError" : "input inputNormal"} onChange={(e)=>{setCode(e.target.value)}}/>
              </tr>
              <tr className='tr'>
                <button class="button" type ="submit">Verify</button>
              </tr>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Verify;
