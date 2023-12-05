import React from 'react'
import './ComponentsCss/CreateGroupCss.css'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MyIconButton from './MyIconButton';
import WaitingCreateGroup from './WaitingCreateGroup';
function CreateGroup() {
  return (
    <div className = "CreateGroup-Zone">
        <div className='CreateGroup'>
            <div className = "CreateGroup-Div">
                <input type="text" className='CreateGroup-Div-Input' placeholder='Enter group name'/>
            </div>
            <div className = "CreateGroup-Div-Icon">
                <MyIconButton  icon = {CheckCircleIcon} color = "#393f4d" fontSize = {40}/>
            </div>
        </div>
        <div className='CreateGroup-Witing'>
            <WaitingCreateGroup/>
        </div>
    </div>
  )
}

export default CreateGroup