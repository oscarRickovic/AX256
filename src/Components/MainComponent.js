import React from 'react'
import './ComponentsCss/MainComponentCss.css';
import SideBar from './SideBar';
import WorkArea from './WorkArea';

function MainComponent() {
  return (
    <div className = "MainComponent">
      <SideBar/>
      <WorkArea/>
    </div>
  )
}

export default MainComponent