import React from 'react'
import './ComponentsCss/SideBarSettingsCss.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';
import MyIconButton from './MyIconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { useSelector} from 'react-redux'
function SideBarSettings() {
    const navigate = useNavigate();
    let iconColor = "#393f4d";
    const light = useSelector(state=>state.LightState.value);
  return (
    <div className='SideBar-Settings'>
        <div className='SideBar-Settings-User-Icon' onClick = {()=>{navigate('/app/MyProfile')}}>
            <MyIconButton icon = {AccountCircleIcon} color = {iconColor} fontSize = {30}/>
        </div>
        <div className='SideBar-Settings-Possibilities'>
            <MyIconButton icon = {PersonAddIcon} color = {iconColor} fontSize = {30} id = "findNewFriends"/>
            <MyIconButton icon = {light?ModeNightIcon:LightModeIcon} color = {iconColor} fontSize = {30} id = "lightButton"/> 
            <MyIconButton icon = {LogoutIcon} color = {iconColor} fontSize = {30} id = "logoutButton" callBack = {navigate} valueCallBack = '/'/>
        </div>
     </div>
  )
}

export default SideBarSettings