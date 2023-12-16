import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './ComponentsCss/UpdatedProfileCss.css'; // Updated CSS file for styling

function UpdateProfile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('Abdelwahed Elminawi');
  const [gender, setGender] = useState('Male');
  const [email, setEmail] = useState('Abdelwahed_Elminai@gmail.com');
  const [bio, setBio] = useState("Hi there, I'm using A for fun.");
  const [profilePicture, setProfilePicture] = useState(null);

  const handleUpdateProfile = () => {
    console.log('Updated Profile:', { username, gender, email, bio, profilePicture });
    navigate('/app/myProfile');
  };

  const handlePictureChange = (e) => {
    const selectedFile = e.target.files[0];
    setProfilePicture(selectedFile);
  };

  const handleChooseFileClick = () => {
    document.getElementById('profilePictureInput').click();
  };

  return (
    <div className='UpdatedProfile'>
      <div className='UpdatedProfile-WhiteDiv'>
        <div className='UpdatedProfile-Img'>
          <Avatar
            alt="Remy Sharp"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxx8mLIqSwLq3xOeOu_nQP2AEvPt0cFdvSRw&usqp=CAU"
            sx={{ width: 90, height: 90 }}
          />
        </div>
        <div className='UpdatedProfile-Infos'>
          <div className='updated-info-div'>
            <label>Username:</label>
            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className='updated-info-div'>
            <label>Gender:</label>
            <input type='text' value={gender} onChange={(e) => setGender(e.target.value)} />
          </div>
          <div className='updated-info-div'>
            <label>Email:</label>
            <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='updated-info-div'>
            <label>Bio:</label>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
          </div>
          <div className='updated-info-div'>
            <button className='ChooseFileButton' onClick={handleChooseFileClick}>
              add picture
            </button>
            <input
              type='file'
              accept='*.png'
              id='profilePictureInput'
              style={{ display: 'none' }}
              onChange={handlePictureChange}
            />
          </div>
        </div>
        <div className='div-SaveProfile'>
          <button className='SaveUpdatedProfile' role='button' onClick={handleUpdateProfile}>
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
