import React, { useState, useEffect, FC } from 'react';
import { Link } from 'react-router-dom';
import type ChatStore from '../store/chat';

const PersonSwitcher: FC<{ chatStore: ChatStore }> = ({ chatStore }) => {
  const [{ newDataCount: chatState }, setChatState] = useState(
    chatStore.chatState,
  );
  const location = window.location.href.split('/')[3];

  useEffect(() => {
    chatStore.subscribe(setChatState);
    chatStore.init();
  }, [chatStore]);

  const messageNotification = chatState > 0 && (
    <span className="notify">{chatState}</span>
  );

  return (
    <div className="switcher-div">
      <Link to="/first-person">
        <button type="button" className="switcher">
          Person1
          {location !== 'first-person' &&
            location.length > 1 &&
            messageNotification}
        </button>
      </Link>
      <Link to="/second-person">
        <button type="button" className="switcher">
          Person2
          {location !== 'second-person' && messageNotification}
        </button>
      </Link>
    </div>
  );
};

export default PersonSwitcher;
