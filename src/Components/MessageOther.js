import React from 'react'
import './ComponentsCss/MessageOtherCss.css'
import { Avatar } from '@mui/material'
function MessageOther() {
  return (
    <div className = "MessageOther">
        <div className='MessageOther-Icon'>
            <Avatar alt="Remy Sharp" src="https://wallpapers-clan.com/wp-content/uploads/2023/05/cute-anime-boy-art-wallpaper.jpg" />
        </div>
        <div className='MessageOther-Msg'>
            afin a abdelhadi labas
        </div>
    </div>
  )
}

export default MessageOther