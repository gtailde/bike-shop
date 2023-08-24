import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/App.scss';
import AppRouter from 'router/AppRouter';
import { Header } from 'components/header/Header';
import { Footer } from 'components/footer/Footer';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Header />
        <AppRouter />
        <ToastContainer />
        <Footer />
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
