import React, { useEffect, useState, useRef } from 'react';
import './ComponentsCss/TextingZoneCss.css';
import MessageOther from './MessageOther';
import SelfMessage from './SelfMessage';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import sendCryptedData from './StaticFunctions/SendingCryptedDataToServer';

function TextingZone() {
  const color = useSelector((state) => state.ColorState.fourth);
  const light = useSelector((state) => state.LightState.value);
  let renderTextingZone = useSelector((state) => state.RendersState.TextingZone);
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    const fetch = async () => {
      try {
        let response = await sendCryptedData('GET', `${process.env.REACT_APP_URL}/message/${id}`)
        if (response.status === 200) {
          setMessages(response.data);
          return;
        }
        setError(true);
      } catch (e) {
        setError(true);
      }
    };

    fetch();
  }, [renderTextingZone,id]);

  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages, renderTextingZone,id]);

  return (
    <div
      className="TextingZone"
      style={light ? { backgroundColor: color.light } : { backgroundColor: color.dark }}
      ref={containerRef}
    >
      {error ? (
        <h1>Error</h1>
      ) : (
        messages.map((m) =>
          m.me ? <SelfMessage key={m._id} msg={m.message} /> : <MessageOther key={m._id} msg={m.message} />
        )
      )}
    </div>
  );
}

export default TextingZone;
