import React, { useState } from 'react';
import './style.scss';
import { ReactComponent as UserIcon } from './assets/user-icon.svg';
import { ReactComponent as BasketIcon } from './assets/basket.svg';
import { Link, useNavigate } from 'react-router-dom';
import { pagePathnames } from 'router/pagePathnames';
import { NavPopup } from 'components/popup/NavPopup';
import { Logo } from 'components/UI/Logo/Logo';
import customersApi from 'API/CustomersAPI';
import { toast } from 'react-toastify';

export const Header = () => {
  const [isNavPopupActive, setIsNavPopupActive] = useState(false);
  const navigate = useNavigate();
  const openPopup = () => {
    setIsNavPopupActive(true);
  };

  const closePopup = () => {
    setIsNavPopupActive(false);
  };

  const logout = async (tokenType: 'access_token') => {
    try {
      await customersApi.logoutCustomer(tokenType);
      toast.success('You have successfully logged out!', {
        theme: 'dark',
      });
      navigate(pagePathnames.login);
    } catch (error) {
      toast.error('You are already logged out!', {
        theme: 'dark',
      });
    }
  };

  return (
    <header className="page-header">
      <div className="page-header__content page-wrapper">
        <nav className="page-header__site-navigation">
          <Link to={pagePathnames.main}>
            <Logo className="page-header__logo"></Logo>
          </Link>
          <Link to={pagePathnames.catalog} className="link page-header__link">
            shop
          </Link>
          <Link to={pagePathnames.about} className="link page-header__link">
            about
          </Link>
        </nav>
        <div className="page-header__user-navigation">
          <span className="page-header__user-navigation-item user" onClick={openPopup}>
            <UserIcon className="user__icon" />
            <span className="user__name"> user name</span>
          </span>
          <NavPopup isOpened={isNavPopupActive} onClose={closePopup}>
            <Link to={pagePathnames.user} className="nav-popup__link" onClick={closePopup}>
              Profile
            </Link>
            <Link to={pagePathnames.login} className="nav-popup__link" onClick={closePopup}>
              Log in
            </Link>
            <Link
              to={pagePathnames.login}
              className="nav-popup__link"
              onClick={async () => {
                closePopup();
                await logout('access_token');
              }}
            >
              Log out
            </Link>
            <Link to={pagePathnames.registration} className="nav-popup__link" onClick={closePopup}>
              Sign up
            </Link>
          </NavPopup>
          <Link to={pagePathnames.basket} className="page-header__user-navigation-item">
            <span className="basket">
              <BasketIcon className="basket__icon" />
              <span className="basket__barge">99</span>
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};
