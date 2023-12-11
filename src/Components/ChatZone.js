import React from 'react';
import "./ComponentsCss/ChatZoneCss.css";
import ChatZoneFriendInfo from './ChatZoneFriendInfo';
import TextingZone from './TextingZone';
import WritingMsgZone from './WritingMsgZone';
import PageNotFound from './PageNotFound';
import NoChatSelected from './NoChatSelected';

function ChatZone({ user, error, isPending }) {
  // const value = useSelector(state => state.PassNewFriendState.value);

  // The perspective about this component is like this :
  // First it will search for new user
  // if it found something it will hide the sidebar.
  // if it doesn't find anything it will wait for 10s then it will return the sidebar.
  if(user == null) {
    
  }
  if (isPending) {
    return <NoChatSelected rotation={true} />;
  }

  if (error) {
    return <PageNotFound error={"X"} comment={"server error while finding new friends"} />;
  }

  return (
    <div className='ChatZone'>
      {user && (
        <>
          <ChatZoneFriendInfo user={user} />
          <TextingZone />
          <WritingMsgZone />
        </>
      )}
    </div>
  );
}

export default ChatZone;
