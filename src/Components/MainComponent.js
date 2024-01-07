import React, { useEffect } from 'react';
import './ComponentsCss/MainComponentCss.css';
import SideBar from './SideBar';
import WorkArea from './WorkArea';
import { Outlet } from 'react-router-dom';
import io from 'socket.io-client';
import { setSocket } from './ReduxDocs/SocketState';
import { useDispatch } from 'react-redux';
import sendCryptedData from './StaticFunctions/SendingCryptedDataToServer';

const fetch = async (link) => {
  await sendCryptedData('GET', link);
};

function MainComponent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(`${process.env.REACT_APP_SOCKET_URL}`);
    dispatch(setSocket(socket));
    socket.emit('onLine', localStorage.getItem('A-JWT'));
    const handleBeforeUnload = () => {
      socket.emit('offLine', localStorage.getItem('A-JWT'));
      socket.disconnect();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      handleBeforeUnload();
    };
  }, []);

  return (
    <div className="MainComponent">
      <SideBar />
      <WorkArea component={Outlet} />
    </div>
  );
}

export default MainComponent;
