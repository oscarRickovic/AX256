import logo from './logo.svg';
import './App.css';
import MainComponent from './Components/MainComponent';
import Login from './Components/Login';
import {Routes, Route} from 'react-router-dom';
import NoChatSelected from './Components/NoChatSelected';
import ChatZone from './Components/ChatZone';
import CreateGroup from './Components/CreateGroup';
import PageNotFound from './Components/PageNotFound';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element = {<Login/>}/>
        <Route path='/app' element = {<MainComponent/>}>
          <Route path = '' element = {<NoChatSelected/>}/>
          <Route path = 'chat' element = {<ChatZone/>}/>
          <Route path = 'newGroup' element = {<CreateGroup/>}/>
        </Route>
        <Route path = '*' element = {<PageNotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
