import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatZone from './ChatZone';
import axios from 'axios';
import sendCryptedData from './StaticFunctions/SendingCryptedDataToServer';

function ChatZoneFetching() {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    const path = `${process.env.REACT_APP_URL}/user/friendShip/${id}`;
    const fetch = async() => {
      try {
        let response = await sendCryptedData('GET', path)
        if(response.status == 200) {
          setData(response.data);
        }
        else {setError(true)}
      } catch(e){
        setError(true)
      }
    }
    fetch();
  }, [id]);

  return <ChatZone user={data} error={error} isPending={isPending} />;
}

export default ChatZoneFetching;
