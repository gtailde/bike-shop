import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/App.scss';
import AppRouter from 'router/AppRouter';
import { Header } from 'components/header/Header';
import { Footer } from 'components/footer/Footer';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
      <ToastContainer autoClose={2000} hideProgressBar />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
