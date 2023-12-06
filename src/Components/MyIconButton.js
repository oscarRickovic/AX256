import React from 'react'
import { IconButton } from '@mui/material';
function MyIconButton(props) {
    let style = {
        color : props.color
    }
    let sx = {
        fontSize : props.fontSize
    }
    // since each IconButton must do different work we should pass the method as props.
    const iconButtonMethod = ()=>{
        if(props.callBack == null) {
            // No method is passed.
            return;
        }
        props.callBack( ! props.valueCallBack);
    }
  return (
    <>
        <IconButton onClick = {iconButtonMethod}>
            {<props.icon style = {style} sx = {sx}/>}
        </IconButton>
    </>
  )
}

export default MyIconButton;