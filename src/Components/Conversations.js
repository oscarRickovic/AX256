import React from 'react'
import "./ComponentsCss/ConversationsCss.css"
import ConversationElement from './ConversationElement'
import { useSelector } from 'react-redux'

function Conversations({users}) {
  const light = useSelector((state) => state.LightState.value);
  let styleLight = {
    backgroundColor : '#d4d4dc',
  }
  let styleDark = {
    backgroundColor : 'rgb(53, 52, 52)'
  }
  return (
    <div className='Conversations' style={light ? styleLight : styleDark}>
      {light}
      {users.map( user => {

        return (<div key={user.id}>
          <ConversationElement user={user} />
        </div>)
      })}
      
    </div>
  )
}

export default Conversations