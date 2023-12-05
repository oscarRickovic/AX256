import React from 'react'
import './ComponentsCss/WritingMsgZoneCss.css'
import MyIconButton from './MyIconButton'
import SendIcon from '@mui/icons-material/Send';
function WritingMsgZone() {
  return (
    <div className= "WritingMsgZone">
      <div className = "WritingMsgZone-Div">
        <input type="text" className='WritingMsgZone-Div-Input' placeholder='text..'/>
      </div>
      <div className = "WritingMsgZone-Icons">
        <MyIconButton  icon = {SendIcon} color = "#393f4d" fontSize = {40}/>
      </div>
    </div>
  )
}

export default WritingMsgZone