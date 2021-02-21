import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import PersonSwitcher from './components/PersonSwitcher.component';
import FirstPerson from './components/FirstPerson.component';
import SecondPerson from './components/SecondPerson.component';
import './App.css';
import ChatStore from './store/chat';

const App: FC = () => {
  const chatStore = new ChatStore({ data: [], newDataCount: 0 });
  return (
    <>
      <PersonSwitcher chatStore={chatStore} />
      <Switch>
        <Route
          exact
          path="/"
          component={() => <FirstPerson chatStore={chatStore} />}
        />
        <Route
          exact
          path="/first-person"
          component={() => <FirstPerson chatStore={chatStore} />}
        />
        <Route
          exact
          path="/second-person"
          component={() => <SecondPerson chatStore={chatStore} />}
        />
      </Switch>
    </>
  );
};

export default App;
