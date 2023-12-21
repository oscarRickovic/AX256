import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../FetchData/useFetch";
import { Avatar } from "@mui/material";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import axios from 'axios';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import UserProfileInformations from './UserProfileInformations';
import './ComponentsCss/FriendInfoCss.css'; // Import the CSS file for styling

const FriendInfo = () => {
  const { id } = useParams();
  return (
    <div className='UserProfile'>
        <div className='UserProfile-WhiteDiv'>
          <div className={'UserProfile-WhiteDiv-Couverture'}>
            <div id="left" ><ArrowLeftIcon sx={{ fontSize: 40 }} /></div>
            <div id="right-top" ><ArrowRightIcon sx={{ fontSize: 40 }} /></div>
          </div>
          <div className="UserProfile-WhiteDiv-Informations">
            <div className="UserProfile-WhiteDiv-Img">
            <Avatar
              alt="Hellooo"
              src={`/imagesStore/0db76e10-9e88-11ee-9d8b-81f83a7f6ae7.png`}
              sx={{ width: 90, height: 90 }}
            />
            </div>
            <div className='informations'>
                <div className="column-60">
                    <div className="sub-div">
                        <p className='sub-div-label'>name</p>
                        
                    </div>
                    <div className="sub-div">
                        <p className='sub-div-label'>email</p>
                        
                    </div>
                    <div className="sub-div">
                        <p className='sub-div-label'>gender</p>
                        
                    </div>
                </div>
                <div class="column-40">
                    <div class="sub-div-90">
                        <p className='sub-div-label'>bio</p>
                        
                    </div>
                    <div className="sub-div">
                        <p className='sub-div-label'>new password</p>
                        
                    </div>
                    <div class="sub-div-10">
                    <button className='update' style = {{backgroundColor : `#c25757`}}>Block this user</button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
  )
};

export default FriendInfo;
