import React from 'react'
import './ComponentsCss/MessageOtherCss.css'
import { Avatar } from '@mui/material'
function MessageOther({msg}) {
  return (
        <div className='MessageOther-Msg'>
            {msg}
        </div>

  )
}

export default MessageOther