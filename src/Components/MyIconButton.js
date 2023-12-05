import React from 'react'
import { IconButton } from '@mui/material';
function MyIconButton(props) {
    let style = {
        color : props.color
    }
    let sx = {
        fontSize : props.fontSize
    }
  return (
    <>
        <IconButton>
            {<props.icon style = {style} sx = {sx}/>}
        </IconButton>
    </>
  )
}

export default MyIconButton