import React, {useState} from 'react'
import './ComponentsCss/UserProfileInformationsCss.css'
import { Alert, MenuItem, Select } from '@mui/material'
import check from './StaticFunctions/HandleLoginRegisterForms';
import sendCryptedData from './StaticFunctions/SendingCryptedDataToServer';
import CheckPasswordBeforeUpdate from './CheckPasswordBeforeUpdate'
function input_div(type, condition, value1, value2, callBack) {
    if(condition) {
        return <input className = 'sub-div-input' type={type} value = {value1} onChange={(e)=>{callBack(e.target.value)}}/>
    }
    else {
        return <input className = 'sub-div-input' style = {{borderBottom: 'none'}} type="text" value = {value2} readOnly/>
    }
}

function textarea_div(condition, value1, value2, callBack) {
    if(condition) {
        return <textarea id="bio" name="bio" value ={value1} onChange={(e)=>callBack(e.target.value)} maxLength={300}/>
    }
    else {
        return <textarea id="bio" name="bio" style={{border: 'none'}} value = {value2} readOnly/>
    }
}

function select_div(condition, value1, value2, callBack) {
    if(condition) {
        return (
            <Select value = {value1} onChange={(e)=>{callBack(e.target.value)}}>
                    <MenuItem value={"male"}>male</MenuItem>
                    <MenuItem value={"female"}>femal</MenuItem>
            </Select>
        )
    }
    else {
        return <input className = 'sub-div-input' style = {{borderBottom: 'none'}} type="text" value = {value2} readOnly/>
    }
}

function UserProfileInformations(props) {
    const [updateProfileClicked, setUpdateProfileClicked] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('male');
    const [bio, setBio] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState(0);
    const [msg, setMsg] = useState('');
    const [checkPassword, setCheckPassword] = useState(false);
    const me = props.me;
    
    const updateCheckInputs = () => {
        let errors = [];
        if(username.length == 0 &&
            email.length == 0 &&
                bio.length == 0 &&
                    gender === "male" && 
                        password.length == 0) {
                            errors.push(`You can't update profile without new data`);
                            return errors;
                        }
        
        // If the username is not changed it will be the same as the previous one.
        if(username != '') {
            if(!check.checkUserName(username)) {
                errors.push('The length of username must be more than 4 characters and less than 20, without extra characters. Only alpha numeric and `- _` allowed');
                return errors;
            }
        }

        if(email != '') {
            if(!check.checkEmail(email)){
                errors.push('Use email format and only alpha numeric characters and `- _`');
                return errors;
            }
        }
        
        if(!check.checkGender(gender)) {
            errors.push('please choose between the 2 options..');
            return errors;
        }

        if(password != '') {
            if(!check.checkPassword(password)) {
                errors.push('Your password length needs to be more than 8 characters, without extra characters. At least 2 upper letters, at least 3 lower case, at least 2 numbers. `_ -` allowed')
                return errors;
            }
        }

        if(bio != '') {
            if(!check.checkBio(bio)) {
                errors.push('the length of your bio is too large please make it less than 300 character.');
                return errors;
            }
        }
        return errors;
    }

    const updateAlert = async (type, msg) => {
        if(type != "error" && type != "success"){
            console.log(`UserProfile error in updateAlert function`);
            return;
        }
        if(type == "error") {
            setResult(-1);
        }
        else if(type == "success") {
            setResult(1);
        }
        setMsg(msg);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setResult(0);
        setMsg('')
    }

    const changeComponent = () => {
        setCheckPassword(false)
        setUpdateProfileClicked(true);
        
    }
    const update = async() => {
        let errors = updateCheckInputs();
        if(errors.length === 0) {
            const data = {
                username : username,
                email : email,
                password : password,
                gender: gender,
                bio: bio 
            }
            let response = await sendCryptedData("post", data, `${process.env.REACT_APP_URL}/user/updateMyProfile`);
            let res = response.status;
            switch (res) {
                case 200:
                  localStorage.setItem('A_JWT', response.data)
                  break;
                case 500:
                  errors.push('Server error while checking data');
                  break;
                case 501:
                  errors.push('server error while updating user');
                  break;
                case 407:
                  errors.push('Please use another email, this one is already used');
                  break;
                default:
                  errors.push('Status not acceptable ' + res);
            }
            if(errors.length == 0) {
                updateAlert("success", "your profile is update successfully");
                props.refresh(!props.value);
                setUpdateProfileClicked(false);

            }
            else {
                updateAlert("error", errors[0]);
            }
        }
        else {
            updateAlert("error", errors[0]);
        }
    }

  return (
    <>
        {(result === 1 || result === -1) && <Alert severity={result === -1 ? "error" : "success"}>{msg}</Alert>}
        {
            !checkPassword ? 
            <div className='informations' style = {{display : `${(result === 0 ? '' : 'none')}`}}>
                <div className="column-60">
                    <div className="sub-div">
                        <p className='sub-div-label'>name</p>
                        {input_div("text", updateProfileClicked, username, me.username, setUsername)}
                    </div>
                    <div className="sub-div">
                        <p className='sub-div-label'>email</p>
                        {input_div("text", updateProfileClicked, email, me.email, setEmail)}
                    </div>
                    <div className="sub-div">
                        <p className='sub-div-label'>gender</p>
                        {select_div(updateProfileClicked, gender, me.gender, setGender)}
                    </div>
                </div>
                <div class="column-40">
                    <div class="sub-div-90">
                        <p className='sub-div-label'>bio</p>
                        {textarea_div(updateProfileClicked, bio, me.bio, setBio)}
                    </div>
                    <div className="sub-div">
                        <p className='sub-div-label'>new password</p>
                        {input_div("password", updateProfileClicked, password, "", setPassword)}
                    </div>
                    <div class="sub-div-10">
                        {
                            !updateProfileClicked ? 
                                <button className='update' onClick = {() => {setCheckPassword(true)}}>Update</button>
                            :
                                <button className='update' style = {{backgroundColor : `#7dc489`}} onClick = {update}>Update</button>
                        }
                    </div>
                </div>
            </div>
            : 
           <CheckPasswordBeforeUpdate status = {changeComponent} />
        }
    </>
  )
}

export default UserProfileInformations