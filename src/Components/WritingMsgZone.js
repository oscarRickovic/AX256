import React, { useState } from 'react'
import './ComponentsCss/WritingMsgZoneCss.css'
import SendIcon from '@mui/icons-material/Send';
import {useSelector} from 'react-redux'
import { IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';

function WritingMsgZone() {
  const color = useSelector(state => state.ColorState.fourth);
  const light = useSelector(state => state.LightState.value);
  const socket = useSelector(state => state.SocketState.value);
  const [msg, setMsg] = useState('');

  const {id} = useParams();

  const sendMsg = () => {
    socket.emit('sendMsg', msg, id);
  }
  return (
    <div className= "WritingMsgZone" style = {light ? {backgroundColor : color.light} :{backgroundColor : color.dark}}>
      <div className = "WritingMsgZone-Div">
        <input type="text"
                className='WritingMsgZone-Div-Input'
                  style = {light ? {backgroundColor : color.light} :{backgroundColor : color.dark}}
                    placeholder='text..'
                    onChange={(e)=>{setMsg(e.target.value)}}/>
      </div>
      <div className = "WritingMsgZone-Icons">
        <IconButton onClick={sendMsg}>
          <SendIcon style={{color: "#393f4d"}} sx={{fontSize : 40}} />
        </IconButton>
      </div>
    </div>
  )
}

export default WritingMsgZone