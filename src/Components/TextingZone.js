import React from 'react'
import './ComponentsCss/TextingZoneCss.css'
import MessageOther from './MessageOther';
import SelfMessage from './SelfMessage';
import {useSelector} from 'react-redux'
function TextingZone() {
  const color = useSelector(state => state.ColorState.fourth);
  const light = useSelector(state => state.LightState.value);
  return (
    <div className='TextingZone' style = {light ? {backgroundColor : color.light} :{backgroundColor : color.dark}}>
      <MessageOther/>
      <SelfMessage/>
      <MessageOther/>
      <SelfMessage/>
      <MessageOther/>
      <SelfMessage/>
      <MessageOther/>
      <SelfMessage/>
    </div>
  )
}

export default TextingZone;