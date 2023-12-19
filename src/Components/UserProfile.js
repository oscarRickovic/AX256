import React, { useEffect, useState } from 'react';
import './ComponentsCss/UserProfileCss.css';
import { Alert, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import axios from 'axios';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function UserProfile() { 
    const [updatePicture, setUpdatePicture] = useState(false);
    const [error, setError] = useState(false);
    const [msg, setMsg] = useState('');
    const [me, setMe] = useState({});
    const [myPictures, setMyPictures] = useState([]);
    let [currentPicture, setCurrentPicture] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async (link, callBack) => {
            try {
                const response = await axios.get(link, {
                    headers: {
                        'A_JWT': localStorage.getItem('A_JWT')
                    }
                });
    
                if (response.data !== null) {
                    console.log(response.data)
                    callBack(response.data);
                }
            } catch (error) {
                console.error('Error fetching user information:', error);
            }
        };
        fetchData("http://localhost:5000/ownInformations", setMe);
        fetchData("http://localhost:5000/image/myPictures", setMyPictures)
    }, []);
    
      
    const handleFileChange = async (type, e) => {
        if(type != "profile" && type != "picture") {
            alert("no tye found");
            return;
        }
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        let link = (
            type == "profile" ? 
                "http://localhost:5000/image/profile":
                    type == "picture" ?
                        "http://localhost:5000/image/picture":
                            ""
        )
        alert(link)
        try {
          let response = await axios.post(link, formData, {
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
      
      const dec = () => {
        const n = myPictures.length - 1;
        if((n + 1) == 1 || (n + 1) == 0) return;
        if(currentPicture - 1 < 0){
            setCurrentPicture(n);
            return;
        }
        setCurrentPicture(currentPicture - 1); 
      }

      const inc = () => {
        const n = myPictures.length - 1;
        if((n + 1) == 1 || (n + 1) == 0) return;
        if(currentPicture + 1 > n){
            setCurrentPicture(0);
            return;
        }
        setCurrentPicture(currentPicture + 1);
      }
      let backgroundImage = (myPictures.length !=0 ? `url('/imagesStore/${myPictures[currentPicture].name}')` : '');

    return (
        <>
            {(error == 1 || error == -1) && <Alert severity={error == -1 ? "error" : "success"}>{msg}</Alert>}
            <div className='UserProfile'>
            <div className='UserProfile-WhiteDiv'>
                <div className={'UserProfile-WhiteDiv-Couverture'} style={{ backgroundImage: `${backgroundImage}` }}>
                    <div id="left" onClick={dec}><ArrowLeftIcon  sx={{ fontSize: 40 }}/></div>
                    <div id="right-top" onClick = {inc}><ArrowRightIcon  sx={{ fontSize: 40 }}/></div>
                    <div id="right-bottom">
                        <label htmlFor="PictureInput" style={{cursor: 'pointer'}}>
                            <input
                                type="file"
                                id="PictureInput"
                                style={{ display: 'none'}}
                                onChange= {(e)=>{handleFileChange("picture", e)}}
                            />
                                    
                            <AddCircleOutlineIcon  sx={{ fontSize: 40 }}/>
                        </label>
                    
                    </div>
                </div>
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
                                        onChange={(e)=>{handleFileChange("profile", e)}}
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
