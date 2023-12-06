import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../FetchData/useFetch";
import { Avatar } from "@mui/material";
import './ComponentsCss/FriendInfoCss.css'; // Import the CSS file for styling

const FriendInfo = () => {
  const { id } = useParams();
  const { data: user, error, isPending } = useFetch('http://localhost:4000/users/' + id);

  return (
    <div className="FriendInfo">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {user && (
        <div className="FriendInfo-WhiteDiv">
          <div className={'FriendInfo-Couverture'} style={{ backgroundImage: 'url("https://random.imagecdn.app/500/150")' }} />
          <div className="FriendInfo-Informations">
            <div className="FriendInfo-Img">
              <Avatar
                alt={user.username}
                src={user.img}
                sx={{ width: 90, height: 90 }}
              />
            </div>
            <div className="FriendInfo-Infos">
              <div className="info-div">{user.username}</div>
              {/* Add more details as needed */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendInfo;
