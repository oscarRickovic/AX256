import React, { useEffect, useState } from 'react';
import './ComponentsCss/UserProfileCss.css';
import { Alert, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import axios from 'axios';

function UserProfile() {
    const [updatePicture, setUpdatePicture] = useState(false);
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState('');
    const [me, setMe] = useState({});
    const navigate = useNavigate();

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
                    <div className="UserProfile-WhiteDiv-Img">
                        {
                            !updatePicture ? (
                                <Avatar
                                    onMouseEnter={() => setUpdatePicture(true)}
                                    onMouseLeave={() => setUpdatePicture(false)}
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
                                        onMouseEnter={() => setUpdatePicture(true)}
                                        onMouseLeave={() => setUpdatePicture(false)}
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
                        <div className="info-div">{me.username}</div>
                        <div className="info-div">{me.gender}</div>
                        <div className="info-div">{me.email}</div>
                        <div className="info-div">{me.bio}</div>
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
