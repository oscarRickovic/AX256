import React from 'react'
import "./ComponentsCss/ConversationElementCss.css"
import { Avatar } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
function ConversationElement({user}) {
    const navigate = useNavigate();
    const light = useSelector(state => state.LightState.value);
    const color = useSelector(state => state.ColorState.primar);
  return (
    <div className = "ConversationElement" style = {light ? {backgroundColor : color.light} : {backgroundColor : color.dark}} onClick = {()=>{navigate('/app/chat')}}>
        <div className = "ConversationElement-imgUser" >
            <Avatar alt="Remy Sharp" src="https://wallpapers-clan.com/wp-content/uploads/2023/05/cute-anime-boy-art-wallpaper.jpg" />
        </div>
        <div className='ConversationElement-msg'>
            <div className='ConversationElement-msg-nameUser'>
                {user.username}
            </div>
            <div className='ConversationElement-msg-lastMsg-timeStamp'>
                <div className='ConversationElement-msg-lastMsg'>
                    {user.lastMessage}
                </div>
                <div className='ConversationElement-msg-timeStamp'>
                    today.
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default ConversationElement