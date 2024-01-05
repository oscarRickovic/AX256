import React, { useState } from 'react'
import "./ComponentsCss/ConversationElementCss.css"
import { Avatar } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { renderTextingZone } from './ReduxDocs/RendersState';
function ConversationElement({data, recentMsg}) {
    const navigate = useNavigate();
    const light = useSelector(state => state.LightState.value);
    const color = useSelector(state => state.ColorState.primar);
    const socket = useSelector(state => state.SocketState.value);
    let renderTextingZoneValue = useSelector((state) => state.RendersState.TextingZone);
    const [msg, setMsg] = useState(null);
    const dispatch = useDispatch();
    socket.on('receiveMsg', async (res) => {
      if(res.room == data.friendShipId){
        recentMsg(data.friendShipId);
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
                    onClick = {()=>{navigate('/app/chat/' + data.friendInfo._id)}}>
        <div className = "ConversationElement-imgUser" >
            <Avatar alt={data.friendInfo.username} src= {"/imagesStore/" + data.friendInfo.profilePicture} />
        </div>
        <div className='ConversationElement-msg'>
            <div className='ConversationElement-msg-nameUser'>
                {data.friendInfo.username}
                {data.friendInfo.isOnline &&
                  <div className="onLine"></div>
                }
            </div>
            <div className='ConversationElement-msg-lastMsg-timeStamp'>
                <div className='ConversationElement-msg-lastMsg'>
                  {
                    msg == null? data.lastMessage != null ? data.lastMessage : "Say Hello ..."  : msg
                  }
                    
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