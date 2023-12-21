import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar } from "@mui/material";
import axios from 'axios';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import './ComponentsCss/FriendInfoCss.css';
const FriendInfo = () => {
  const { id } = useParams();
  const [friend, setFriend] = useState({});
  const [friendPictures, setFriendPictures] = useState([])
  const [currentPicture, setCurrentPicture] = useState(0);
  useEffect(()=>{
    const fetch = async(link, callBack)=>{
      let response = await axios.get(link,{
        headers:{
          'A_JWT': localStorage.getItem('A_JWT')
        }
      })
      if(response.status == 200) {
        console.log('friend data');
        console.log(response.data)
        callBack(response.data);
      } else {
        console.log('error while feetching friend datas');
      }
    }

    fetch(`${process.env.REACT_APP_URL}/user/${id}`, setFriend);
    fetch(`${process.env.REACT_APP_URL}/image/friendPictures/${id}`, setFriendPictures)

    console.log(friendPictures)
  },[])

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
                        {friend.name}
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
                    <div className="sub-div-90">
                        <p className='sub-div-label'>bio</p>
                        {friend.bio}
                    </div>
                    <div className="sub-div-10">
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
