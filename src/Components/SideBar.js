import React from 'react'
import './ComponentsCss/SideBarCss.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import MyIconButton from './MyIconButton';
import SideBarSearch from './SideBarSearch';
import Conversations from './Conversations';
function SideBar() {
    let iconColor = "#393f4d";
  return (
    <div className='SideBar'>
        
        
        <div className='SideBar-Settings'>
            <div className='SideBar-Settings-User-Icon'>
                <MyIconButton icon = {AccountCircleIcon} color = {iconColor} fontSize = {30}/>
            </div>
            <div className='SideBar-Settings-Possibilities'>
                <MyIconButton icon = {PersonAddIcon} color = {iconColor} fontSize = {30}/>
                <MyIconButton icon = {GroupAddIcon} color = {iconColor} fontSize = {30}/>
                <MyIconButton icon = {AddCircleOutlineIcon} color = {iconColor} fontSize = {30}/>
                <MyIconButton icon = {Brightness4Icon} color = {iconColor} fontSize = {30}/>
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