import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../FetchData/useFetch';
import ChatZone from './ChatZone';
import { useDispatch } from 'react-redux';
import { changeFriend } from './ReduxDocs/PassNewFriendState';

function ChatZoneFetching() {
  const { id } = useParams();
  const [path, setPath] = useState("");
  const dispatch = useDispatch();

  const getRandom = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  useEffect(() => {
    if (id.startsWith("new")) {
      setPath(`http://localhost:7000/friends/${getRandom(1, 15)}`);
    } else {
      setPath(`${process.env.REACT_APP_URL}/user/${id}`);
    }
  }, [id]);
  const { data: user, error, isPending } = useFetch(path);

  useEffect(() => {
    if(path.includes('friends')){
      dispatch(changeFriend(user));
    }
  }, [dispatch, user]);

  return <ChatZone user={user} error={error} isPending={isPending} />;
}

export default ChatZoneFetching;
