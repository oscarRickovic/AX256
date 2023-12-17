import React, { useState } from 'react';
import './ComponentsCss/UserProfileCss.css';
import { Alert, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import axios from 'axios';

function UserProfile() {
    const [updatePicture, setUpdatePicture] = useState(false);
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
      
        try {
          let response = await axios.post("http://localhost:5000/image", formData, {
            headers : {
                'A_JWT' : localStorage.getItem('A_JWT')
            }
          });
          setError(1);
          setMsg(response.data);
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setError(0);
          setMsg('');
        } catch (error) {
            setError(-1);
            setMsg("Server Error While uploading picture");
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setError(0);
            setMsg('');
        }
      };
      

    return (
        <>
            {(error == 1 || error == -1) && <Alert severity={error == -1 ? "error" : "success"}>{msg}</Alert>}
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
                                <label htmlFor="profilePictureInput" style={{cursor: 'pointer'}}>
                                    <input
                                        type="file"
                                        id="profilePictureInput"
                                        style={{ display: 'none'}}
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
    </>
    );
}

export default UserProfile;
