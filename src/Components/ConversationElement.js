import React, { useState } from 'react'
import "./ComponentsCss/ConversationElementCss.css"
import { Avatar } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { renderTextingZone } from './ReduxDocs/RendersState';
function ConversationElement({user, keyChat}) {
    const navigate = useNavigate();
    const light = useSelector(state => state.LightState.value);
    const color = useSelector(state => state.ColorState.primar);
    const socket = useSelector(state => state.SocketState.value);
    let renderTextingZoneValue = useSelector((state) => state.RendersState.TextingZone);
    const [msg, setMsg] = useState('');
    const dispatch = useDispatch();
    socket.on('receiveMsg', async (res) => {
      if(res.room == keyChat){
        setMsg(res.msg);
        console.log(renderTextingZoneValue)
        dispatch(renderTextingZone())
        console.log(renderTextingZoneValue)
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
                {user.isOnline &&
                  <div className="onLine"></div>
                }
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