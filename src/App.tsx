import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/App.scss';
import AppRouter from 'router/AppRouter';
import { Header } from 'components/header/Header';
import { Footer } from 'components/footer/Footer';

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Header />
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
