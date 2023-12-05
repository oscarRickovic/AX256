import React from 'react'
import './ComponentsCss/TextingZoneCss.css'
import MessageOther from './MessageOther';
import SelfMessage from './SelfMessage';
function TextingZone() {
  return (
    <div className='TextingZone'>
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