import React from 'react'
import "./ComponentsCss/ConversationsCss.css"
import ConversationElement from './ConversationElement'

function Conversations({users}) {

  return (
    <div className='Conversations'>
      
      {users.map( user => {

        return (<div key={user.id}>
          <ConversationElement user={user} />
        </div>)
      })}
      
    </div>
  )
}

export default Conversations