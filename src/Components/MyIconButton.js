import React from 'react';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeLight } from './ReduxDocs/LightState';

function MyIconButton(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const socket = useSelector(state => state.SocketState.value);

  const iconButtonMethod = async () => {
    if (props.callBack != null) {
      props.callBack(props.valueCallBack);
    } else {
      switch (props.id) {
        case 'lightButton':
          dispatch(changeLight());
          break;
        case 'logoutButton':
          socket.emit('offLine', localStorage.getItem('A-JWT'));
          localStorage.removeItem('A-JWT');
          navigate('/Login')
          break;
        case 'findNewFriends':
          alert('it works');
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
