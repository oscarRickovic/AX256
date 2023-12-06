import React, { useState } from 'react'
import './ComponentsCss/SideBarCss.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';
import MyIconButton from './MyIconButton';
import SideBarSearch from './SideBarSearch';
import Conversations from './Conversations';
function SideBar() {
    let iconColor = "#393f4d";
    const [light, setLight] = useState(true);
    const changeLight = (value) => {
        setLight(value);
    }
  return (
    //Streotype : 
    // MyButton we will pass :
    // 1- icon.
    // 2- color of the button.
    // 3- method that will launch after click on the icon button.
    // 4- value is the argument that the method will use.
    
    <div className='SideBar'>
        <div className='SideBar-Settings'>
            <div className='SideBar-Settings-User-Icon'>
                <MyIconButton icon = {AccountCircleIcon} color = {iconColor} fontSize = {30}/>
            </div>
            <div className='SideBar-Settings-Possibilities'>
                <MyIconButton icon = {PersonAddIcon} color = {iconColor} fontSize = {30}/>
                <MyIconButton icon = {GroupAddIcon} color = {iconColor} fontSize = {30}/>
                <MyIconButton icon = {AddCircleOutlineIcon} color = {iconColor} fontSize = {30}/>
                <MyIconButton icon = {light?ModeNightIcon:LightModeIcon} color = {iconColor} fontSize = {30} callBack = {changeLight} valueCallBack = {light}  /> 
            </div>
        </div>

        <SideBarSearch/>
        <Conversations/>

    </div>
  )
}

export default SideBar


{/* 



*/}