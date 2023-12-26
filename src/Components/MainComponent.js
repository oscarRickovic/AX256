import React,{useEffect}from 'react'
import './ComponentsCss/MainComponentCss.css';
import SideBar from './SideBar';
import WorkArea from './WorkArea';
import { Outlet } from 'react-router-dom';
import io from 'socket.io-client';
import { setSocket } from './ReduxDocs/SocketState';
import { useDispatch } from 'react-redux';

function MainComponent() {
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io(`${process.env.REACT_APP_SOCKET_URL}`);
    dispatch(setSocket(socket));
  }, []);

  return (
    <div className = "MainComponent">
      <SideBar/>
      <WorkArea component = {Outlet}/>
    </div>
  )
}

export default MainComponent