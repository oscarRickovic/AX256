import React from 'react'
import './ComponentsCss/UserProfileCss.css'
import { Avatar } from '@mui/material'
import { useNavigate } from 'react-router-dom'
// The name may be confusing, this is the component that show the user profile not the friends profile.
// Using this component we can have the button to update informations and add or delete images.
function UserProfile() {
    const navigate = useNavigate();
    let style = {
        backgroundImage : 'url("https://random.imagecdn.app/500/150")'
    }

  return (
    <div className='UserProfile'>
        <div className='UserProfile-WhiteDiv'>
            <div className={'UserProfile-WhiteDiv-Couverture'} style={style}/>
            <div className = "UserProfile-WhiteDiv-Informations">
                <div className = "UserProfile-WhiteDiv-Img">
                    <Avatar
                        alt="Remy Sharp"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxx8mLIqSwLq3xOeOu_nQP2AEvPt0cFdvSRw&usqp=CAU"
                        sx={{ width: 90, height: 90 }}
                    />
                </div>
                <div className = "UserProfile-WhiteDiv-Infos">
                    <div className = "info-div">Abdelwahed Elminawi</div>
                    <div className = "info-div">Male</div>
                    <div className = "info-div">Abdelwahed_Elminai@gmail.com</div>
                    <div className = "info-div">Hi there I'm using A for fun..</div>
                </div>
                <div className = "div-UpdateProfile">
                    <button class="UpdateProfile" role="button" onClick={()=>{navigate('/app/updateProfile')}}>Update profile</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserProfile