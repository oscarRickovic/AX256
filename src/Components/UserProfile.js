import React, { useEffect, useState } from 'react';
import './ComponentsCss/UserProfileCss.css';
import { Alert, Avatar } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import axios from 'axios';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import UserProfileInformations from './UserProfileInformations';
function UserProfile() {
  const [updatePicture, setUpdatePicture] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState('');
  const [me, setMe] = useState({});
  const [myPictures, setMyPictures] = useState([]);
  const [currentPicture, setCurrentPicture] = useState(0);
  const [successUpdateProfile, setSuccessUpdateProfile] = useState(0);
  const [successAddPictures, setSuccessAddPictures] = useState(0);
  
  //const navigate = useNavigate();

  const apiBaseURL = "http://localhost:5000";

  const fetchData = async (link, callBack) => {
    try {
      const response = await axios.get(link, {
        headers: {
          'A_JWT': localStorage.getItem('A_JWT')
        }
      });

      if (response.data !== null) {
        console.log(response.data);
        callBack(response.data);
      }
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };

  useEffect(() => {
    fetchData(`${apiBaseURL}/ownInformations`, setMe);
  }, [successUpdateProfile]);

  useEffect(() => {
    fetchData(`${apiBaseURL}/image/myPictures`, setMyPictures);
  }, [successAddPictures]);

  const handleFileChange = async (type, e) => {
    if (type !== "profile" && type !== "picture") {
      return;
    }

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const link = (type === "profile" ? `${apiBaseURL}/image/profile` : (type === "picture" ? `${apiBaseURL}/image/picture` : ""));

    try {
      const response = await axios.post(link, formData, {
        headers: {
          'A_JWT': localStorage.getItem('A_JWT')
        }
      });

      setError(1);
      setMsg(response.data);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setError(0);
      setMsg('');

      if (type === "picture") {
        setSuccessAddPictures(successAddPictures + 1);
      } else {
        setSuccessUpdateProfile(successUpdateProfile + 1);
      }
    } catch (error) {
      setError(-1);
      setMsg("Server Error While uploading picture");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setError(0);
      setMsg('');
    }
  };

  const handleDecrement = () => {
    const n = myPictures.length - 1;
    if (n <= 0) return;
    setCurrentPicture((currentPicture - 1 + n) % n);
  };

  const handleIncrement = () => {
    const n = myPictures.length - 1;
    if (n <= 0) return;
    setCurrentPicture((currentPicture + 1) % n);
  };

  const backgroundImage = (myPictures.length !== 0 ? `url('/imagesStore/${myPictures[currentPicture].name}')` : '');

  const renderProfilePicture = () => (
    <Avatar
      onMouseEnter={() => setUpdatePicture(true)}
      onMouseLeave={() => setUpdatePicture(false)}
      alt={me.username}
      src={`/imagesStore/${me.profilePicture}`}
      sx={{ width: 90, height: 90 }}
    />
  );

  const renderUpdateProfilePicture = () => (
    <label htmlFor="profilePictureInput" style={{ cursor: 'pointer' }}>
      <input
        type="file"
        id="profilePictureInput"
        style={{ display: 'none' }}
        onChange={(e) => { handleFileChange("profile", e) }}
      />
      <Avatar
        onMouseEnter={() => setUpdatePicture(true)}
        onMouseLeave={() => setUpdatePicture(false)}
        alt="User update profile"
        sx={{ width: 90, height: 90 }}
      >
        <PhotoCameraIcon />
      </Avatar>
    </label>
  );

  

  return (
    <>
      {(error === 1 || error === -1) && <Alert severity={error === -1 ? "error" : "success"}>{msg}</Alert>}
      <div className='UserProfile'>
        <div className='UserProfile-WhiteDiv'>
          <div className={'UserProfile-WhiteDiv-Couverture'} style={{ backgroundImage }}>
            <div id="left" onClick={handleDecrement}><ArrowLeftIcon sx={{ fontSize: 40 }} /></div>
            <div id="right-top" onClick={handleIncrement}><ArrowRightIcon sx={{ fontSize: 40 }} /></div>
            <div id="right-bottom">
              <label htmlFor="PictureInput" style={{ cursor: 'pointer' }}>
                <input
                  type="file"
                  id="PictureInput"
                  style={{ display: 'none' }}
                  onChange={(e) => { handleFileChange("picture", e) }}
                />
                <AddCircleOutlineIcon sx={{ fontSize: 40 }} />
              </label>
            </div>
          </div>
          <div className="UserProfile-WhiteDiv-Informations">
            <div className="UserProfile-WhiteDiv-Img">
              {!updatePicture ? renderProfilePicture() : renderUpdateProfilePicture()}
            </div>
                <UserProfileInformations me = {me}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
