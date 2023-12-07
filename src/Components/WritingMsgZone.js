import React from 'react'
import './ComponentsCss/WritingMsgZoneCss.css'
import MyIconButton from './MyIconButton'
import SendIcon from '@mui/icons-material/Send';
import {useSelector} from 'react-redux'
function WritingMsgZone() {
  const color = useSelector(state => state.ColorState.fourth);
  const light = useSelector(state => state.LightState.value);
  return (
    <div className= "WritingMsgZone" style = {light ? {backgroundColor : color.light} :{backgroundColor : color.dark}}>
      <div className = "WritingMsgZone-Div">
        <input type="text" className='WritingMsgZone-Div-Input' style = {light ? {backgroundColor : color.light} :{backgroundColor : color.dark}} placeholder='text..'/>
      </div>
      <div className = "WritingMsgZone-Icons">
        <MyIconButton  icon = {SendIcon} color = "#393f4d" fontSize = {40}/>
      </div>
    </div>
  )
}

export default WritingMsgZone