import React from 'react'
import "./ComponentsCss/WorkAreaCss.css"
import ChatZone from './ChatZone'
import NoChatSelected from './NoChatSelected'
import CreateGroup from './CreateGroup'
function WorkArea(props) {
  return (
    <div className='WorkArea'>
      {<props.component/>}
    </div>
  )
}

export default WorkArea