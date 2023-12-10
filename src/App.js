import logo from './logo.svg';
import './App.css';
import MainComponent from './Components/MainComponent';
import Login from './Components/Login';
import {Routes, Route} from 'react-router-dom';
import NoChatSelected from './Components/NoChatSelected';
import CreateGroup from './Components/CreateGroup';
import PageNotFound from './Components/PageNotFound';
import UserProfile from './Components/UserProfile';
import {useSelector} from 'react-redux'
import FriendInfo from './Components/FriendInfo';
import UpdateProfile from './Components/UpdateProfile';
import ChatZoneFetching from './Components/ChatZoneFetching';

function App() {
  let color  = useSelector(state => state.ColorState.third);
  let light = useSelector(state => state.LightState.value);
  // Please keep in mind the first letter of the path should be lower case. (chat-newGroup..)
  return (
    <div className="App" style = {light ? {backgroundColor : color.light} : {backgroundColor : color.dark}}>
      <Routes>
        <Route path='/' element = {<Login/>}/>
        <Route path='/app' element = {<MainComponent/>}>
          <Route path = '' element = {<NoChatSelected rotation = {false} />}/>
          <Route path = 'chat/:id' element = {<ChatZoneFetching/>}/>
          <Route path = 'newGroup' element = {<CreateGroup/>}/>
          <Route path = 'myProfile' element = {<UserProfile/>}/>
          <Route path = 'friendInfo/:id' element = {<FriendInfo/>}/>
          <Route path = 'updateProfile' element = {<UpdateProfile/>}/>
        </Route>
        <Route path = '*' element = {<PageNotFound error= {404} comment = {"page not found, please double check the URL"}/>}/>
      </Routes>
    </div>
  );
}

export default App;
