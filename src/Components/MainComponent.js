import React from 'react'
import './ComponentsCss/MainComponentCss.css';
import SideBar from './SideBar';
import WorkArea from './WorkArea';
import { Outlet } from 'react-router-dom';

function MainComponent() {
  return (
    <div className = "MainComponent">
      <SideBar/>
      <WorkArea component = {Outlet}/>
    </div>
  )
}

export default MainComponent