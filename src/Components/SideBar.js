import React, { useState } from 'react'
import './ComponentsCss/SideBarCss.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import LightModeIcon from '@mui/icons-material/LightMode';
import MyIconButton from './MyIconButton';
import SideBarSearch from './SideBarSearch';
import Conversations from './Conversations';
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import useFetch from '../FetchData/useFetch';
import WaitingToFetch from './WaitingToFetch';
import { useSelector, useDispatch } from 'react-redux'

function SideBar() {
    const { error, isPending, data: users } = useFetch('http://localhost:4000/users')
    let iconColor = "#393f4d";
    const light = useSelector(state=>state.LightState.value);
    const navigate = useNavigate();
    let color = useSelector(state => state.ColorState.second);
  return (
    //Streotype : 
    // MyButton we will pass :
    // 1- icon.
    // 2- color of the button.
    // 3- id of button
    // 4- method that will launch after click on the icon button.
    // 5- value is the argument that the method will use.
    <div className='SideBar' style = {light ? {backgroundColor : color.light} : {backgroundColor : color.dark}}>
        <div className='SideBar-Settings'>
            <div className='SideBar-Settings-User-Icon' onClick = {()=>{navigate('/app/MyProfile')}}>
                <MyIconButton icon = {AccountCircleIcon} color = {iconColor} fontSize = {30}/>
            </div>
            <div className='SideBar-Settings-Possibilities'>
                <MyIconButton icon = {PersonAddIcon} color = {iconColor} fontSize = {30}/>
                <MyIconButton icon = {light?ModeNightIcon:LightModeIcon} color = {iconColor} fontSize = {30} id = "lightButton"/> 
                <MyIconButton icon = {LogoutIcon} color = {iconColor} fontSize = {30} id = "logoutButton" callBack = {navigate} valueCallBack = '/'/>
            </div>
        </div>
        <SideBarSearch/>
        { error && <div>{ error }</div> }
        { users ? <Conversations users={users} /> : <WaitingToFetch/>}
    </div>
  )
}

export default SideBar


{/* 



*/}