import React, { useState } from 'react';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './ComponentsCss/UpdatedProfileCss.css'; // Updated CSS file for styling

function UpdateProfile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('Abdelwahed Elminawi'); // Initial username
  const [gender, setGender] = useState('Male'); // Initial gender
  const [email, setEmail] = useState('Abdelwahed_Elminai@gmail.com'); // Initial email
  const [bio, setBio] = useState("Hi there, I'm using A for fun."); // Initial bio

  // Function to handle profile update
  const handleUpdateProfile = () => {
    // Perform the logic to update the user profile (API call, state update, etc.)
    // For simplicity, I'm just logging the updated information to the console.
    console.log('Updated Profile:', { username, gender, email, bio });

    // Navigate back to the user profile page after updating
    navigate('/app/myProfile');
  };

  return (
    <div className='UpdatedProfile'>
      <div className='UpdatedProfile-WhiteDiv'>
        {/* Add any update profile form or fields here */}
        <div className='UpdatedProfile-Img'>
          <Avatar
            alt="Remy Sharp"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxx8mLIqSwLq3xOeOu_nQP2AEvPt0cFdvSRw&usqp=CAU"
            sx={{ width: 90, height: 90 }}
          />
        </div>
        <div className='UpdatedProfile-Infos'>
          {/* Add input fields for updating information */}
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
        </div>
        <div className='div-SaveProfile'>
          {/* Button to save the updated profile */}
          <button className='SaveUpdatedProfile' role='button' onClick={handleUpdateProfile}>
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
