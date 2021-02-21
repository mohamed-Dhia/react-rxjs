import React, { FC, FormEvent, useLayoutEffect, useState } from 'react';
import ChatStore, { Message } from '../store/chat';

const FirstPerson: FC<{ chatStore: ChatStore }> = ({ chatStore }) => {
  const [chatState, setChatState] = useState(chatStore.state);
  const [messageInput, setMessageInput] = useState('');

  useLayoutEffect(() => {
    chatStore.subscribe(setChatState);
    chatStore.init();
  }, [chatStore]);

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message: Message = {
      person: 'first-person',
      text: messageInput.trim(),
    };
    chatStore.sendMessage(message);
    setMessageInput('');
  };

  return (
    <div className="container">
      <h2>Mycroft</h2>
      <div className="chat-box">
        {chatState.data.map((message) => (
          <div>
            <p className={message.person}>{message.text}</p>
            <div className="clear" />
          </div>
        ))}
      </div>
      <form id="messageForm" onSubmit={onFormSubmit}>
        <input
          type="text"
          id="messageInput"
          name="messageInput"
          placeholder="type here..."
          value={messageInput}
          onChange={({ target: { value } }) => setMessageInput(value)}
          required
        />
        <button type="submit">Send</button> <br />
      </form>
      <button
        type="button"
        className="clear-button"
        onClick={chatStore.clearChat}
      >
        Clear Chat
      </button>
    </div>
  );
};

export default FirstPerson;
