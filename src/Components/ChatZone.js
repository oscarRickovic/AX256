import React from 'react'
import "./ComponentsCss/ChatZoneCss.css"
import ChatZoneFriendInfo from './ChatZoneFriendInfo'
import TextingZone from './TextingZone'
import WritingMsgZone from './WritingMsgZone'
import { useParams } from "react-router-dom";
import useFetch from '../FetchData/useFetch'

function ChatZone() {
  const { id } = useParams();
  const { data: user, error, isPending } = useFetch('http://localhost:4000/users/' + id);

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