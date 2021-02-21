import React, { useState, useEffect, FC } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import type ChatStore from '../store/chat';

const PersonSwitcher: FC<{ chatStore: ChatStore } & RouteComponentProps> = ({
  chatStore,
  location: { pathname },
}) => {
  const [{ newDataCount: chatState }, setChatState] = useState(
    chatStore.chatState,
  );

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
          {pathname !== '/first-person' &&
            pathname.length > 1 &&
            messageNotification}
        </button>
      </Link>
      <Link to="/second-person">
        <button type="button" className="switcher">
          Person2
          {pathname !== '/second-person' && messageNotification}
        </button>
      </Link>
    </div>
  );
};

export default withRouter(PersonSwitcher);
