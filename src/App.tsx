import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/app.scss';
import AppRouter from 'components/AppRouter';
import Header from 'components/header/Header';

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Header></Header>
        <AppRouter></AppRouter>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
