import React,{useEffect}from 'react'
import './ComponentsCss/MainComponentCss.css';
import SideBar from './SideBar';
import WorkArea from './WorkArea';
import { Outlet } from 'react-router-dom';
import io from 'socket.io-client';

function MainComponent() {
  useEffect(() => {
    const socket = io(`http://localhost:7777`);
    console.log('helloooo')

    socket.on('chat message', (msg) => {
        console.log('Received message:', msg);
    });
    
    return () => {
      socket.disconnect();
    };

  }, []);

  return (
    <div className = "MainComponent">
      <SideBar/>
      <WorkArea component = {Outlet}/>
    </div>
  )
}

export default MainComponent