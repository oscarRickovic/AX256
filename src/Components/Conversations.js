import React from 'react'
import "./ComponentsCss/ConversationsCss.css"
import ConversationElement from './ConversationElement'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Conversations({users}) {
  const navigate = useNavigate();

  const light = useSelector((state) => state.LightState.value);
  return (
    <div className='Conversations'>
      {light}
      {users.map( user => {

        return (
        <div key={user.id} onClick={() => {navigate('/app/chat/' + user.id)}}>
          <ConversationElement user={user} />
        </div>
        )
      })}
      
    </div>
  )
}

export default Conversations