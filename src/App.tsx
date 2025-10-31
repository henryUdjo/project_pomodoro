// import { NotFoxund } from './pages/NotFoxund';
// import { AboutPomodoro } from './pages/AboutPomodoro';

import { TaskContextProvider } from './contexts/TaskContexts/TaskContextProvider';
import { MessagesContainer } from './components/MessagesContainer/MessagesContainer';

import './style/themes.css';
import './style/global.css';
import { MainRouter } from './routers/MainRouter';
// import { useState } from 'react';

function App() {
  return (
    <TaskContextProvider>
      <MessagesContainer />
      <MainRouter />
    </TaskContextProvider>
  );
}

export default App;
