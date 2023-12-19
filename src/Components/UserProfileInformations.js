import React, {useState} from 'react'
import './ComponentsCss/UserProfileInformationsCss.css'
import { MenuItem, Select } from '@mui/material'

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
        return <textarea id="bio" name="bio" value ={value1} onChange={(e)=>callBack(e.target.value)}/>
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
    const me = props.me;
    
    const update = () => {
        console.log(username, email, gender, bio);
        setUpdateProfileClicked(false);
    }
  return (
    <div className='informations'>
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
                <p className='sub-div-label'>password</p>
                {input_div("password", updateProfileClicked, password, "****", setPassword)}
            </div>
            <div class="sub-div-10">
                {
                    !updateProfileClicked ? 
                        <button className='update' onClick = {() => {setUpdateProfileClicked(true)}}>Update</button>
                    :
                        <button className='update' style = {{backgroundColor : `#7dc489`}} onClick = {update}>Update</button>
                }
            </div>
        </div>
    </div>
  )
}

export default UserProfileInformations