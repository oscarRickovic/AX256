import React from 'react'
import { useParams } from "react-router-dom";
import useFetch from '../FetchData/useFetch'
import ChatZone from './ChatZone';
function ChatZoneFetching() {
    const { id } = useParams();
    const { data: user, error, isPending } = useFetch('http://localhost:4000/users/' + id);
  return (
    <ChatZone user = {user} error = {error} isPending = {isPending}/>
  )
}

export default ChatZoneFetching