import React, { useState } from 'react'
import "./ComponentsCss/ConversationElementCss.css"
import { Avatar } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
function ConversationElement({user, keyChat}) {
    const navigate = useNavigate();
    const light = useSelector(state => state.LightState.value);
    const color = useSelector(state => state.ColorState.primar);
    const socket = useSelector(state => state.SocketState.value);
    const [msg, setMsg] = useState('');
    socket.on('receiveMsg', (res) => {
      if(res.room == keyChat){
        setMsg(res.msg)
      }
    })
  return (
    <div className = "ConversationElement"
            style = {light ? {backgroundColor : color.light} :
                {backgroundColor : color.dark}}
                    onClick = {()=>{navigate('/app/chat/' + user._id)}}>
        <div className = "ConversationElement-imgUser" >
            <Avatar alt={user.username} src= {"/imagesStore/" + user.profilePicture} />
        </div>
        <div className='ConversationElement-msg'>
            <div className='ConversationElement-msg-nameUser'>
                {user.username}
            </div>
            <div className='ConversationElement-msg-lastMsg-timeStamp'>
                <div className='ConversationElement-msg-lastMsg'>
                    {msg}
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