import React from 'react'
import "./ComponentsCss/ConversationElementCss.css"
import { Avatar } from '@mui/material'
import { useNavigate } from "react-router-dom";
function ConversationElement({user}) {
    const navigate = useNavigate();
  return (
    <div className = "ConversationElement" onClick = {()=>{navigate('/app/chat')}}>
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