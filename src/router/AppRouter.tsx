import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from 'hocs/AuthProvider';
import { CheckAuth } from 'hocs/CheckAuth';
import { pagePathnames } from 'router/pagePathnames';
import { Main } from 'pages/main/Main';
import { LoginPage } from 'pages/login/LoginPage';
import { Registration } from 'pages/registration/Registration';
import { Error } from 'pages/error/Error';
import { About } from 'pages/about/About';
import { Catalog } from 'pages/catalog/Catalog';
import { UserProfile } from 'pages/user-profile/UserProfile';
import { Basket } from 'pages/basket/Basket';

const AppRouter = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path={pagePathnames.main} element={<Main />} />
        <Route path={pagePathnames.about} element={<About />} />
        <Route path={pagePathnames.catalog} element={<Catalog />} />
        <Route
          path={pagePathnames.login}
          element={
            // <CheckAuth>
            <LoginPage />
            // </CheckAuth>
          }
        />
        <Route
          path={pagePathnames.registration}
          element={
            // <CheckAuth>
            <Registration />
            // </CheckAuth>
          }
        />
        <Route
          path={pagePathnames.user}
          element={
            <CheckAuth>
              <UserProfile />
            </CheckAuth>
          }
        />
        <Route path={pagePathnames.basket} element={<Basket />} />
        <Route path={pagePathnames.error} element={<Error />} />
        <Route path="/*" element={<Navigate to={pagePathnames.error} />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRouter;
