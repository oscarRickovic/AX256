import React from 'react';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeLight } from './ReduxDocs/LightState';

function MyIconButton(props) {
  const dispatch = useDispatch();
  const light = useSelector((state) => state.LightState.value);
  const newFriend = useSelector((state) => state.PassNewFriendState.value);
  const navigate = useNavigate();

  const iconButtonMethod = () => {
    if (props.callBack != null) {
      props.callBack(props.valueCallBack);
    } else {
      switch (props.id) {
        case 'lightButton':
          dispatch(changeLight());
          break;
        case 'logoutButton':
          // Add specific logic for logoutButton if needed
          break;
        case 'findNewFriends':
            const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
          navigate('/app/chat/new' + getRandom(1, 10000));
          break;
        default:
          // Handle other cases if needed
          break;
      }
    }
  };

  const style = {
    color: props.color,
  };

  const sx = {
    fontSize: props.fontSize,
  };

  return (
    <IconButton onClick={iconButtonMethod}>
      {<props.icon style={style} sx={sx} />}
    </IconButton>
  );
}

export default MyIconButton;
