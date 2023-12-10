import React from 'react';
import "./ComponentsCss/ChatZoneCss.css";
import ChatZoneFriendInfo from './ChatZoneFriendInfo';
import TextingZone from './TextingZone';
import WritingMsgZone from './WritingMsgZone';
import { useSelector } from 'react-redux';
import PageNotFound from './PageNotFound';
import NoChatSelected from './NoChatSelected';

function ChatZone({ user, error, isPending }) {
  // const value = useSelector(state => state.PassNewFriendState.value);
  console.log(user);

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
