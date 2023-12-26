import React, { useState } from 'react'
import './ComponentsCss/WritingMsgZoneCss.css'
import SendIcon from '@mui/icons-material/Send';
import {useDispatch, useSelector} from 'react-redux'
import { IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import { renderTextingZone } from './ReduxDocs/RendersState';

function WritingMsgZone() {
  const color = useSelector(state => state.ColorState.fourth);
  const light = useSelector(state => state.LightState.value);
  const socket = useSelector(state => state.SocketState.value);
  const [msg, setMsg] = useState('');
  const dispatch = useDispatch();
  const {id} = useParams();

  const sendMsg = async () => {
    setMsg('')
    socket.emit('sendMsg', msg, id, localStorage.getItem('A_JWT'));
    dispatch(renderTextingZone())
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMsg();
    }
  };

  return (
    <div className= "WritingMsgZone" style = {light ? {backgroundColor : color.light} :{backgroundColor : color.dark}}>
      <div className = "WritingMsgZone-Div">
        <input type="text"
                className='WritingMsgZone-Div-Input'
                  value = {msg}
                  style = {light ? {backgroundColor : color.light} :{backgroundColor : color.dark}}
                    placeholder='text..'
                    onKeyPress={handleKeyPress}
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