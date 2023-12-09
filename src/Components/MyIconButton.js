import React from 'react'
import { IconButton } from '@mui/material';
import { changeLight } from './ReduxDocs/LightState';
import { changeFindNewFriendState} from './ReduxDocs/FindNewFriendState'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom";
function MyIconButton(props) {
    const dispatch = useDispatch();
    const light = useSelector((state)=>state.LightState.value)
    const navigate = useNavigate();
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
        }
        if(props.id == "lightButton") {
            dispatch(changeLight())
        }
        if(props.id == "logoutButton") {
            props.callBack(props.valueCallBack);
        }
        if(props.id == "findNewFriends"){
            dispatch( changeFindNewFriendState())
            navigate('/app/chat/new');
            setTimeout(()=>{
                dispatch(changeFindNewFriendState());
            },10000)
        }
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