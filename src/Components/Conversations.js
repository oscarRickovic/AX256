import {useEffect} from 'react'
import "./ComponentsCss/ConversationsCss.css"
import ConversationElement from './ConversationElement'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Conversations({users}) {
  const navigate = useNavigate();
  const light = useSelector((state) => state.LightState.value);
  const socket = useSelector(state => state.SocketState.value);

  // Connect all the sockets with all Conversations.
  useEffect(()=>{
    // get All rooms (chat Id).
    let rooms = [];
    for(let i = 0; i < users.length; i++){
      rooms.push(users[i].friendShipId);
    }
    if(socket != null) {
      socket.emit('join-rooms', rooms);
    } 
  },[socket, users])

  return (
    <div className='Conversations'>
      {light}
      {users.map( user => {
        
        return (
        <div key={user.friendShipId} onClick={() => {navigate('/app/chat/' + user.friendInfo._id)}}>
          <ConversationElement user={user.friendInfo} key = {user.friendShipId}/>
        </div>
        )
      })}
      
    </div>
  )
}

export default Conversations