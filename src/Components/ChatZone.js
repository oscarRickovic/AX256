import React from 'react'
import "./ComponentsCss/ChatZoneCss.css"
import ChatZoneFriendInfo from './ChatZoneFriendInfo'
import TextingZone from './TextingZone'
import WritingMsgZone from './WritingMsgZone'
function ChatZone() {
  return (
    <div className='ChatZone'>
        <ChatZoneFriendInfo/>
        <TextingZone/>
        <WritingMsgZone/>
    </div>
  )
}

export default ChatZone