import React from 'react'
import "./ComponentsCss/SideBarSearchCss.css";
import MyIconButton from './MyIconButton';
import SearchIcon from '@mui/icons-material/Search';
function SideBarSearch() {
  return (
    <div className='SideBarSearch'>
        <MyIconButton icon = {SearchIcon} color = "#393f4d" font = "30"/>
        <input type = "text" className = "SideBarSearch-Input"/>
    </div>
  )
}

export default SideBarSearch