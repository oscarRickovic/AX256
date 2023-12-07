import React from 'react'
import './ComponentsCss/ErrorGettingFriendsCss.css'
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
function ErrorGettingFriends() {
  return (
    <div className='ErrorGettingFriends'>
        <ReportProblemIcon sx = {{ fontSize: 150 }}/>
    </div>
  )
}

export default ErrorGettingFriends