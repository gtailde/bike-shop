import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/App.scss';
import AppRouter from 'router/AppRouter';
import { UserProvider } from 'hocs/userProvider';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
