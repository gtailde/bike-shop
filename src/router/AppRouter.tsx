import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from 'hocs/AuthProvider';
import { CheckAuth } from 'hocs/CheckAuth';
import { pagePathnames } from 'router';
import { Main } from 'pages/main/Main';
import { Login } from 'pages/login/Login';
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
        <Route path={pagePathnames.MAIN} element={<Main />} />
        <Route path={pagePathnames.ABOUT} element={<About />} />
        <Route path={pagePathnames.CATALOG} element={<Catalog />} />
        <Route
          path={pagePathnames.LOGIN}
          element={
            <CheckAuth>
              <Login />
            </CheckAuth>
          }
        />
        <Route
          path={pagePathnames.REGISTRATION}
          element={
            <CheckAuth>
              <Registration />
            </CheckAuth>
          }
        />
        <Route
          path={pagePathnames.USER_PROFILE}
          element={
            <CheckAuth>
              <UserProfile />
            </CheckAuth>
          }
        />
        <Route path={pagePathnames.BASKET} element={<Basket />} />
        <Route path={pagePathnames.ERROR} element={<Error />} />
        <Route path="/*" element={<Navigate to={pagePathnames.ERROR} />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRouter;
