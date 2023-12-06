import React from 'react'
import "./ComponentsCss/ConversationsCss.css"
import ConversationElement from './ConversationElement'
import { Link } from 'react-router-dom'

function Conversations({users}) {

  return (
    <div className='Conversations'>
      
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