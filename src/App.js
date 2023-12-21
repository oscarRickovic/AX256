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
import PageNotFound from './Components/PageNotFound';
import Verify from './Components/Verify';

const checkUserJwt = async (token) => {
  if (!token) return false;
  try {
    const res = await axios.post(`${process.env.REACT_APP_URL}/user/checkUserJwt`, { token });
    return res.status === 200;
  } catch (error) {
    return false;
  }
};

const PrivateRoute = ({ element, to = "/Login", value = true }) => {
  const [filteredElement, setFilteredElement] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const filterResult = await checkUserJwt(localStorage.getItem('A_JWT'));
      setFilteredElement(filterResult == value ? element : <Navigate to= {to} />);
    };

    fetchData();
  }, [element]);

  return <>{filteredElement}</>;
};

const App = () => {
  const color = useSelector((state) => state.ColorState.third);
  const light = useSelector((state) => state.LightState.value);

  return (
    <div className="App" style={light ? { backgroundColor: color.light } : { backgroundColor: color.dark }}>
      <Routes>
        <Route path="/Login" element={<PrivateRoute element={<Login/>} to='/app' value = {false}/>} />
        <Route path="/Register" element= {<PrivateRoute element={<Register/>} to='/app' value = {false}/>} />
        <Route path="/app" element={<PrivateRoute element={<MainComponent />}/>}>
          <Route path="" element={<NoChatSelected rotation={false} />} />
          <Route path="chat/:id" element={<ChatZoneFetching />} />
          <Route path="myProfile" element={<UserProfile />} />
          <Route path="friendInfo/:id" element={<FriendInfo/>} />
        </Route>
        <Route path="/verify" element = {<Verify/>} />
        <Route path="*" element={<PageNotFound error={404} comment="Page not found, please double-check the URL" />} />
      </Routes>
    </div>
  );
};

export default App;
