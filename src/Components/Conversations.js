import React from 'react'
import "./ComponentsCss/ConversationsCss.css"
import ConversationElement from './ConversationElement'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Conversations({users}) {
  const light = useSelector((state) => state.LightState.value);
  return (
    <div className='Conversations'>
      {light}
      {users.map( user => {

        return (
        <div key={user.id}>
          <Link to={`chat/${user.id}`}>
            <ConversationElement user={user} />
          </Link>
        </div>
        )
      })}
      
    </div>
  )
}

export default Conversations