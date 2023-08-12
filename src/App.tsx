import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/App.scss';
import AppRouter from 'router/AppRouter';
import Header from 'components/header/Header';

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Header />
        <AppRouter />
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
