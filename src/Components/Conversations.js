import {useEffect, useState} from 'react'
import "./ComponentsCss/ConversationsCss.css"
import ConversationElement from './ConversationElement'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import sendCryptedData from './StaticFunctions/SendingCryptedDataToServer';
import ErrorGettingFriends from './ErrorGettingFriends';
import NoChatSelected from './NoChatSelected';

function Conversations() {
  const navigate = useNavigate();
  const light = useSelector((state) => state.LightState.value);
  const socket = useSelector(state => state.SocketState.value);
  const renderConversation = useSelector((state) => state.RendersState.Conversations)
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    const getUsers = async () => {
      try {
        let response = await sendCryptedData('GET', `${process.env.REACT_APP_URL}/user`);
        if(response.status == 200) {
          setUsers(response.data);
        }
        else {
          setError(true);
        }
      } catch(e) {
        setError(true)
      }
    }
    getUsers();
  },[renderConversation])

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

  const recentMsg = (friendShipId) => {
    let index = -1;
    for(let i =0; i < users.length; i++) {
      if(users[i].friendShipId === friendShipId){
        index = i;
        break;
      }
    }
    if(index != -1) {
      let recent = users[index];
      users.splice(index, 1);
      setUsers([recent, ...users]);
    }
  }

  return (
    <>
      {users
        ?
      <div className='Conversations'>
        {light}
        {users.map( data => {
          return (
            <div key={data.friendShipId} onClick={() => {navigate('/app/chat/' + data.friendShipId)}}>
              <ConversationElement data = {data} recentMsg = {recentMsg}/>
            </div>
          )
        })}
      </div>
        :
        (error) 
        ? 
        <ErrorGettingFriends/>
        : 
        <NoChatSelected rotation = {true}/>
    }
    </>
  )
}

export default Conversations;