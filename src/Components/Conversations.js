import React from 'react'
import "./ComponentsCss/ConversationsCss.css"
import ConversationElement from './ConversationElement'
function Conversations() {
  return (
    <div className='Conversations'>
      <ConversationElement/>
      <ConversationElement/>
      <ConversationElement/>
      <ConversationElement/>
      <ConversationElement/>
      <ConversationElement/>
      <ConversationElement/>
      <ConversationElement/>
    </div>
  )
}

export default Conversations