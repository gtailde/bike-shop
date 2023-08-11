import { AuthProvider } from 'hocs/AuthProvider';
import Main from 'pages/main/Main';
import Login from 'pages/login/Login';
import Registration from 'pages/registration/Registration';
import Error from 'pages/error/Error';
import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { pagePathnames } from 'router';
import { CheckAuth } from 'hocs/CheckAuth';

const AppRouter = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path={pagePathnames.MAIN} element={<Main />} />
        <Route path="/" element={<Navigate to={pagePathnames.MAIN} />} />
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
        <Route path={pagePathnames.ERROR} element={<Error />} />
        <Route path="/*" element={<Navigate to={pagePathnames.ERROR} />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRouter;
