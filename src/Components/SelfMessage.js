import React from 'react'
import './ComponentsCss/SelfMessageCss.css'
function SelfMessage({msg}) {
  return (
    <div className='SelfMessage'>
       {msg}
    </div>
  )
}

export default SelfMessage