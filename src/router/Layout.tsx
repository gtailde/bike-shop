import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from 'components/header/Header';
import { Footer } from 'components/footer/Footer';
import { ToastContainer } from 'react-toastify';

export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer autoClose={2000} hideProgressBar />
      <Footer />
    </>
  );
};
