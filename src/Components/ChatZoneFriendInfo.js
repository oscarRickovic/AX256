import React from 'react'
import { Avatar } from '@mui/material'
import {useSelector} from 'react-redux'
import './ComponentsCss/ChatZoneFriendInfoCss.css';
import { useNavigate } from "react-router-dom";

function ChatZoneFriendInfo({user}) {
    const color = useSelector(state => state.ColorState.fourth);
    const light = useSelector(state => state.LightState.value);
    const navigate = useNavigate();

  return (
    <div className= "ChatZone-FriendInfo" style = {light ? {backgroundColor : color.light} :{backgroundColor : color.dark}} onClick = {()=>{navigate('/app/friendInfo/'+ user._id)}}>
        <div className='ChatZone-FriendInfo-imgUser'>
                <Avatar alt={user.username} src = {"/imagesStore/" + user.profilePicture} />
        </div>
        <div className='ChatZone-FriendInfo-Name-State'>
            <div className='ChatZone-FriendInfo-Name'>
                {user.username}
            </div>
            <div className = 'ChatZone-FriendInfo-State'>
                online
            </div>
        </div>
    </div>
  )
}

export default ChatZoneFriendInfo