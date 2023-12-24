import React,{useEffect, useState} from 'react'
import './ComponentsCss/SideBarCss.css'
import SideBarSearch from './SideBarSearch';
import Conversations from './Conversations';
import { useSelector} from 'react-redux'
import ErrorGettingFriends from './ErrorGettingFriends';
import SideBarSettings from './SideBarSettings';
import NoChatSelected from './NoChatSelected';
import axios from 'axios';

function SideBar() {
    const light = useSelector(state=>state.LightState.value);
    let color = useSelector(state => state.ColorState.second);
    let findNewFriends = useSelector(state => state.PassNewFriendState.value);
    let renderConversation = useSelector((state) => state.RendersState.Conversations)
    const [error, setError] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [users, setUsers] = useState([]);
    useEffect(()=>{
      const getUsers = async () => {
        try {
          let response = await axios.get(`${process.env.REACT_APP_URL}/user`,{
            headers: {
              'A_JWT' : localStorage.getItem('A_JWT')
            }
          });
          if(response.status == 200) {
            setUsers(response.data);
          }
          else {
            setError(true);
          }
        } catch(e) {
          setError(true)
        }
      }
      getUsers();
    },[renderConversation])
  return (
    //Streotype : 
    // MyButton we will pass :
    // 1- icon.
    // 2- color of the button.
    // 3- id of button
    // 4- method that will launch after click on the icon button.
    // 5- value is the argument that the method will use.
    <div className='SideBar' style = {light ? {backgroundColor : color.light} : {backgroundColor : color.dark}}>
        {findNewFriends == null ?
        <>
            <SideBarSettings/>
            <SideBarSearch/>
            { users ? <Conversations users={users} /> : (error) ? <ErrorGettingFriends/> : <NoChatSelected rotation = {true}/> }
        </> 
        :
        <NoChatSelected rotation = {false}/>}
    </div>
  )
}

export default SideBar
