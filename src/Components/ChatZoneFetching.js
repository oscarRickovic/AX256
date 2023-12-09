import React from 'react'
import { useParams } from "react-router-dom";
import useFetch from '../FetchData/useFetch'
import ChatZone from './ChatZone';
function ChatZoneFetching() {
    const { id } = useParams();
    let path = null;
    const getRandom = (min, max) => {return Math.floor(Math.random() * (max - min + 1)) + min;}
    if(id == "new") {
      const newFriendId = getRandom(1,9);
      path = "http://localhost:7000/friends/" + newFriendId;
      console.log(path)
    }
    else{
      path = 'http://localhost:4000/users/' + id;
    }
    const { data: user, error, isPending } = useFetch(path);
  return (
    <ChatZone user = {user} error = {error} isPending = {isPending}/>
  )
}

export default ChatZoneFetching