import React, { useContext, useState } from 'react';
import './style.scss';
import { ReactComponent as UserIcon } from './assets/user-icon.svg';
import { ReactComponent as BasketIcon } from './assets/basket.svg';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { pagePathnames } from 'router/pagePathnames';
import { NavPopup } from 'components/popup/NavPopup';
import { Logo } from 'components/UI/Logo/Logo';
import { customersApi } from 'API/CustomersAPI';
import { UserContext } from 'store/userContext';

export const Header = () => {
  const { profileInfo, isUserLoggedIn, setIsUserLoggedIn, cart } = useContext(UserContext);
  const [isNavPopupActive, setIsNavPopupActive] = useState(false);
  const navigate = useNavigate();

  const openPopup = () => {
    setIsNavPopupActive(true);
  };

  const closePopup = () => {
    setIsNavPopupActive(false);
  };

  const logout = async (tokenType: 'access_token') => {
    await customersApi.logoutCustomer(tokenType);
    setIsUserLoggedIn?.(false);
    navigate(pagePathnames.login);
  };

  return (
    <header className="page-header">
      <div className="page-header__content page-wrapper">
        <nav className="page-header__site-navigation">
          <Link to={pagePathnames.main}>
            <Logo className="page-header__logo"></Logo>
          </Link>
          <NavLink
            to={pagePathnames.catalog}
            className={({ isActive }) =>
              isActive
                ? 'link page-header__link page-header__link--active'
                : 'link page-header__link'
            }
          >
            shop
          </NavLink>
          <NavLink
            to={pagePathnames.about}
            className={({ isActive }) =>
              isActive
                ? 'link page-header__link page-header__link--active'
                : 'link page-header__link'
            }
          >
            about
          </NavLink>
        </nav>
        <div className="page-header__user-navigation">
          <span className="page-header__user-navigation-item user" onClick={openPopup}>
            <UserIcon className="user__icon" />
            <span className="user__name"> {isUserLoggedIn ? profileInfo?.firstName : 'Guest'}</span>
          </span>
          <NavPopup isOpened={isNavPopupActive} onClose={closePopup}>
            {isUserLoggedIn && profileInfo?.id && (
              <>
                <Link
                  to={`${pagePathnames.users}/${profileInfo?.id}`}
                  className="nav-popup__link"
                  onClick={closePopup}
                >
                  Profile
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
              </>
            )}
            {!isUserLoggedIn && !profileInfo?.id && (
              <>
                <Link to={pagePathnames.login} className="nav-popup__link" onClick={closePopup}>
                  Log in
                </Link>
                <Link
                  to={pagePathnames.registration}
                  className="nav-popup__link"
                  onClick={closePopup}
                >
                  Sign up
                </Link>
              </>
            )}
          </NavPopup>
          <Link to={pagePathnames.basket} className="page-header__user-navigation-item">
            <span className="basket">
              <BasketIcon className="basket__icon" />
              {cart?.totalLineItemQuantity && (
                <span className="basket__barge">{cart?.totalLineItemQuantity}</span>
              )}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};
