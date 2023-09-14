import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { CheckAuth } from 'hocs/CheckAuth';
import { pagePathnames } from 'router/pagePathnames';
import { Main } from 'pages/main/Main';
import { LoginPage } from 'pages/login/LoginPage';
import { RegistrationPage } from 'pages/registration/Registration';
import { Error } from 'pages/error/Error';
import { AboutPage } from 'pages/about/AboutPage';
import { CatalogPage } from 'pages/catalog/Catalog';
import { UserProfilePage } from 'pages/user-profile/UserProfile';
import { BasketPage } from 'pages/basket/BasketPage';
import { ProductDetailsPage } from 'pages/ProductDetails/ProductDetailsPage';
import { RequireAuth } from 'hocs/RequireAuth';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={pagePathnames.main} element={<Main />} />
      <Route path={pagePathnames.about} element={<AboutPage />} />
      <Route path={pagePathnames.catalog} element={<CatalogPage />} />
      <Route path={pagePathnames.product} element={<ProductDetailsPage />} />
      <Route
        path={pagePathnames.login}
        element={
          <CheckAuth>
            <LoginPage />
          </CheckAuth>
        }
      />
      <Route
        path={pagePathnames.registration}
        element={
          <CheckAuth>
            <RegistrationPage />
          </CheckAuth>
        }
      />
      <Route
        path={`${pagePathnames.users}/:id`}
        element={
          <RequireAuth>
            <UserProfilePage />
          </RequireAuth>
        }
      />
      <Route path={pagePathnames.basket} element={<BasketPage />} />
      <Route path={pagePathnames.error} element={<Error />} />
      <Route path="/*" element={<Navigate to={pagePathnames.error} />} />
    </Routes>
  );
};

export default AppRouter;
