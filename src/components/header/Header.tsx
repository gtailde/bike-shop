import React, { useEffect, useState } from 'react';
import './style.scss';
import { ReactComponent as UserIcon } from './assets/user-icon.svg';
import { ReactComponent as BasketIcon } from './assets/basket.svg';
import { Link, useNavigate } from 'react-router-dom';
import { pagePathnames } from 'router/pagePathnames';
import { NavPopup } from 'components/popup/NavPopup';
import { Logo } from 'components/UI/Logo/Logo';
import { customersApi } from 'API/CustomersAPI';
import { type ICustomer } from 'types/types';

export const Header = () => {
  const [profileInfo, setProfileInfo] = useState<ICustomer & { dateOfBirth: string }>();
  const [isNavPopupActive, setIsNavPopupActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    void getCustomerData();
  }, []);

  const getCustomerData = async () => {
    try {
      const customer = await customersApi.getCustomer();
      if ('id' in customer) setProfileInfo(customer);
    } catch (error) {
      console.log('Anonymous session started');
    }
  };

  const openPopup = () => {
    setIsNavPopupActive(true);
    void getCustomerData();
  };

  const closePopup = () => {
    setIsNavPopupActive(false);
  };

  const logout = async (tokenType: 'access_token') => {
    await customersApi.logoutCustomer(tokenType);
    navigate(pagePathnames.login);
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
            <span className="user__name"> {profileInfo?.firstName}</span>
          </span>
          <NavPopup isOpened={isNavPopupActive} onClose={closePopup}>
            {profileInfo?.id && (
              <Link
                to={`${pagePathnames.users}/${profileInfo.id}`}
                className="nav-popup__link"
                onClick={closePopup}
              >
                Profile
              </Link>
            )}
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
