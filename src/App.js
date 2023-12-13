import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import Login from './Components/Login';
import Register from './Components/Register';
import MainComponent from './Components/MainComponent';
import NoChatSelected from './Components/NoChatSelected';
import ChatZoneFetching from './Components/ChatZoneFetching';
import UserProfile from './Components/UserProfile';
import FriendInfo from './Components/FriendInfo';
import UpdateProfile from './Components/UpdateProfile';
import PageNotFound from './Components/PageNotFound';

const checkUserJwt = async (token) => {
  if (!token) return false;
  try {
    const res = await axios.post('http://localhost:5000/user/checkUserJwt', {token : token});
    return res.status === 200;
  } catch (error) {
    return false;
  }
};

const App = () => {
  const color = useSelector((state) => state.ColorState.third);
  const light = useSelector((state) => state.LightState.value);
  const [filteredElement, setFilteredElement] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const filterResult = await checkUserJwt(localStorage.getItem('A_JWT'));
      setFilteredElement(filterResult ? <MainComponent /> : <Login />);
    };

    fetchData();
  }, []);

  return (
    <div className="App" style={light ? { backgroundColor: color.light } : { backgroundColor: color.dark }}>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/app" element={filteredElement}>
          <Route path="" element={<NoChatSelected rotation={false} />} />
          <Route path="chat/:id" element={<ChatZoneFetching />} />
          <Route path="myProfile" element={<UserProfile />} />
          <Route path="friendInfo/:id" element={<FriendInfo />} />
          <Route path="updateProfile" element={<UpdateProfile />} />
        </Route>
        <Route path="*" element={<PageNotFound error={404} comment="Page not found, please double-check the URL" />} />
      </Routes>
    </div>
  );
};

export default App;
