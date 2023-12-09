import React from 'react'
import "./ComponentsCss/ChatZoneCss.css"
import ChatZoneFriendInfo from './ChatZoneFriendInfo'
import TextingZone from './TextingZone'
import WritingMsgZone from './WritingMsgZone'
function ChatZone(props) {
  let {user, error, isPending} = props;
  return (
    <div className='ChatZone'>
        { isPending && <div>Loading...</div> }
        { error && <div>{ error }</div> }
        { user && <ChatZoneFriendInfo user={user} /> }
        <TextingZone/>
        <WritingMsgZone/>
    </div>
  )
}

export default ChatZone