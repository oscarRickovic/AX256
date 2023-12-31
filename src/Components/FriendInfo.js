import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import axios from 'axios';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import './ComponentsCss/FriendInfoCss.css';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import NoChatSelected from "./NoChatSelected";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { renderConversations } from "./ReduxDocs/RendersState";
import sendCryptedData from "./StaticFunctions/SendingCryptedDataToServer";
const FriendInfo = () => {
  const { id } = useParams();
  const [friend, setFriend] = useState({});
  const [friendPictures, setFriendPictures] = useState([])
  const [currentPicture, setCurrentPicture] = useState(0);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetch = async(link, callBack)=>{
    try {
      let response = await sendCryptedData('GET', link)
      if(response.status == 200) {
        if(callBack != null) {
          callBack(response.data);
        }
      } else {
       setError(true);
      }
    } catch(e) {
      setError(true);
    }
  }

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_URL}/user/${id}`, setFriend);
    fetch(`${process.env.REACT_APP_URL}/image/friendPictures/${id}`, setFriendPictures)
  },[])

  if(error) {
    return <NoChatSelected/>
  }

  const handleDecrement = () => {
    const n = friendPictures.length - 1;
    if (n <= 0) return;
    if(currentPicture == 0) {
      setCurrentPicture(n);
    }
    else setCurrentPicture(currentPicture - 1);
  };

  const handleIncrement = () => {
    const n = friendPictures.length - 1;
    if (n <= 0) return;
    if(currentPicture == n) {
      setCurrentPicture(0)
    }
    else {
      setCurrentPicture(currentPicture + 1);
    }
  };

  const blockUser = async () => {
    await fetch(`${process.env.REACT_APP_URL}/user/blockUser/${id}`)
    navigate('/app');
    dispatch(renderConversations());
  }

  const backgroundImage = (friendPictures.length !== 0 ? `url('/imagesStore/${friendPictures[currentPicture].name}')` : '');

  return (
    <div className='UserProfile'>
        <div className='UserProfile-WhiteDiv'>
          <div className={'UserProfile-WhiteDiv-Couverture'} style={{ backgroundImage }}>
            <div id="left" onClick={handleDecrement}><ArrowLeftIcon sx={{ fontSize: 40 }} /></div>
            <div id="right-top" onClick={handleIncrement}><ArrowRightIcon sx={{ fontSize: 40 }} /></div>
          </div>
          <div className="UserProfile-WhiteDiv-Informations">
            <div className="UserProfile-WhiteDiv-Img">
            <Avatar
              alt={friend.username}
              src={`/imagesStore/${friend.profilePicture}`}
              sx={{ width: 90, height: 90 }}
            />
            </div>
            <div className='informations'>
                <div className="column-60">
                    <div className="sub-div">
                        <p className='sub-div-label'>name</p>
                        {friend.username}
                    </div>
                    <div className="sub-div">
                        <p className='sub-div-label'>email</p>
                        {friend.email}
                    </div>
                    <div className="sub-div">
                        <p className='sub-div-label'>gender</p>
                        {friend.gender}
                    </div>
                </div>
                <div className="column-40">
                    <div className="sub-div-90" style ={{height: '75%'}}>
                        <p className='sub-div-label'>bio</p>
                        {friend.bio}
                    </div>
                    <div className="sub-div-10">
                    <button className='block' onClick={blockUser}>
                      <div className="block-icon-div">
                        <RemoveCircleIcon sx= {{fontSize: '20px'}}/>
                      </div>
                      <div className="block-text-div">
                        Block this user
                      </div>
                    </button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
  )
};

export default FriendInfo;
