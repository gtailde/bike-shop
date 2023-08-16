import React, { useState } from 'react';
import './style.scss';
import headerLogo from './assets/logo.svg';
import headerLogoText from './assets/logo-text.svg';
import userIcon from './assets/user-icon.svg';
import basketIcon from './assets/basket.svg';
import { Link } from 'react-router-dom';
import { pagePathnames } from 'router/pagePathnames';
import { NavPopup } from 'components/popup/NavPopup';

export const Header = () => {
  const [isNavPopupActive, setIsNavPopupActive] = useState(false);

  const openPopup = () => {
    setIsNavPopupActive(true);
  };

  const closePopup = () => {
    setIsNavPopupActive(false);
  };

  return (
    <header className="page-header">
      <div className="links">
        <Link to={pagePathnames.main} className="logo-link">
          <img className="header-logo" src={headerLogo} alt="header-icon" />
          <img className="header-logo-text" src={headerLogoText} alt="header-icon" />
        </Link>
        <nav>
          <Link to={pagePathnames.catalog} className="link header-link">
            shop
          </Link>
          <Link to={pagePathnames.about} className="link header-link">
            about
          </Link>
        </nav>
      </div>
      <div className="user-links">
        <div className="user-links-list" onClick={openPopup}>
          <div className="link">
            <img src={userIcon} alt="user-icon" />
            <p className="user-name"> user name</p>
          </div>
        </div>
        <NavPopup isOpened={isNavPopupActive} onClose={closePopup}>
          <Link to={pagePathnames.user} className="nav-popup__link" onClick={closePopup}>
            Profile
          </Link>
          <Link to={pagePathnames.login} className="nav-popup__link" onClick={closePopup}>
            Log in
          </Link>
          <Link to={pagePathnames.login} className="nav-popup__link" onClick={closePopup}>
            Log out
          </Link>
          <Link to={pagePathnames.registration} className="nav-popup__link" onClick={closePopup}>
            Sign up
          </Link>
        </NavPopup>
        <div className="vertical-line"></div>
        <Link to={pagePathnames.basket} className="link">
          <img className="logo-link" src={basketIcon} alt="basket-icon" />
        </Link>
        <div className="barge">3</div>
      </div>
    </header>
  );
};
