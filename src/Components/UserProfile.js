import React, { useState } from 'react';
import './ComponentsCss/UserProfileCss.css';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import axios from 'axios';
import sendCryptedData from './StaticFunctions/SendingCryptedDataToServer';

function UserProfile() {
    const [updatePicture, setUpdatePicture] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
      
        try {
          await axios.post("http://localhost:5000/image", formData);
          console.log('File uploaded successfully');
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      };
      

    return (
        <div className='UserProfile'>
            <div className='UserProfile-WhiteDiv'>
                <div className={'UserProfile-WhiteDiv-Couverture'} style={{ backgroundImage: 'url("https://random.imagecdn.app/500/150")' }} />
                <div className="UserProfile-WhiteDiv-Informations">
                    <div
                        className="UserProfile-WhiteDiv-Img"
                        onMouseEnter={() => setUpdatePicture(true)}
                        onMouseLeave={() => setUpdatePicture(false)}
                    >
                        {
                            !updatePicture ? (
                                <Avatar
                                    alt="User profile"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxx8mLIqSwLq3xOeOu_nQP2AEvPt0cFdvSRw&usqp=CAU"
                                    sx={{ width: 90, height: 90 }}
                                />
                            ) : (
                                <label htmlFor="profilePictureInput">
                                    <input
                                        type="file"
                                        id="profilePictureInput"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                    <Avatar
                                        alt="User update profile"
                                        sx={{ width: 90, height: 90 }}
                                    >
                                        <PhotoCameraIcon />
                                    </Avatar>
                                </label>
                            )
                        }
                    </div>
                    <div className="UserProfile-WhiteDiv-Infos">
                        <div className="info-div">Abdelwahed Elminawi</div>
                        <div className="info-div">Male</div>
                        <div className="info-div">Abdelwahed_Elminai@gmail.com</div>
                        <div className="info-div">Hi there! I'm using A for fun...</div>
                    </div>
                    <div className="div-UpdateProfile">
                        <button className="UpdateProfile" role="button" onClick={() => navigate('/app/updateProfile')}>
                            Update profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
