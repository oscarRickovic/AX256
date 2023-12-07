import logo from './logo.svg';
import './App.css';
import MainComponent from './Components/MainComponent';
import Login from './Components/Login';
import {Routes, Route} from 'react-router-dom';
import NoChatSelected from './Components/NoChatSelected';
import ChatZone from './Components/ChatZone';
import CreateGroup from './Components/CreateGroup';
import PageNotFound from './Components/PageNotFound';
import UserProfile from './Components/UserProfile';
import FriendInfo from './Components/FriendInfo';
import UpdateProfile from './Components/UpdateProfile';

function App() {
  // Please keep in mind the first letter of the path should be lower case. (chat-newGroup..)
  return (
    <div className="App">
      <Routes>
        <Route path='/' element = {<Login/>}/>
        <Route path='/app' element = {<MainComponent/>}>
          <Route path = '' element = {<NoChatSelected/>}/>
          <Route path = 'chat/:id' element = {<ChatZone/>}/>
          <Route path = 'newGroup' element = {<CreateGroup/>}/>
          <Route path = 'myProfile' element = {<UserProfile/>}/>
          <Route path = 'friendInfo/:id' element = {<FriendInfo/>}/>
          <Route path = 'updateProfile' element = {<UpdateProfile/>}/>
        </Route>
        <Route path = '*' element = {<PageNotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
