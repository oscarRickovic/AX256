import React from 'react'
import { Avatar } from '@mui/material'
import MyIconButton from './MyIconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {useSelector} from 'react-redux'
import './ComponentsCss/ChatZoneFriendInfoCss.css'
function ChatZoneFriendInfo({user}) {
    const color = useSelector(state => state.ColorState.fourth);
    const light = useSelector(state => state.LightState.value);
  return (
    <div className= "ChatZone-FriendInfo" style = {light ? {backgroundColor : color.light} :{backgroundColor : color.dark}}>
        <div className='ChatZone-FriendInfo-imgUser'>
            <Avatar alt="Remy Sharp" src="https://wallpapers-clan.com/wp-content/uploads/2023/05/cute-anime-boy-art-wallpaper.jpg" />
        </div>
        <div className='ChatZone-FriendInfo-Name-State'>
            <div className='ChatZone-FriendInfo-Name'>
                {user.username}
            </div>
            <div className = 'ChatZone-FriendInfo-State'>
                online
            </div>
        </div>
        <div className = "ChatZone-FriendInfo-Delete">
            <MyIconButton icon = {DeleteIcon} color = "#393f4d" fontSize = {40}/>
        </div>
    </div>
  )
}

export default ChatZoneFriendInfo