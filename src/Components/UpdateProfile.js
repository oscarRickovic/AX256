import React, { useEffect, useState} from 'react';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './ComponentsCss/UpdatedProfileCss.css'; // Updated CSS file for styling
import axios from 'axios';


function UpdateProfile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [me, setMe] = useState({});

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/ownInformations", {
                headers: {
                    'A_JWT': localStorage.getItem('A_JWT')
                }
            });

            if (response.data !== null) {
                setMe(response.data.user);
            }
        } catch (error) {
            console.error('Error fetching user information:', error);
        }
    };

    fetchData();

}, []);

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
            <input type='text' value={me.username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className='updated-info-div'>
            <label>Gender:</label>
            <input type='text' value={me.gender} onChange={(e) => setGender(e.target.value)} />
          </div>
          <div className='updated-info-div'>
            <label>Email:</label>
            <input type='text' value={me.email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className='updated-info-div'>
            <label>Bio:</label>
            <textarea value={me.bio} onChange={(e) => setBio(e.target.value)} />
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
