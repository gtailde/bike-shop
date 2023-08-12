import React, { type FC } from 'react';
import './style.scss';
import headerLogo from './assets/logo.svg';
import headerLogoText from './assets/logo-text.svg';
import userIcon from './assets/user-icon.svg';
import basketIcon from './assets/basket.svg';
import { Link } from 'react-router-dom';
import { pagePathnames } from 'router/pagePathnames';

export const Header: FC = () => {
  return (
    <header>
      <div className="links">
        <Link to={pagePathnames.main} className="logo-link">
          <img className="header-logo" src={headerLogo} alt="header-icon" />
          <img className="header-logo-text" src={headerLogoText} alt="header-icon" />
        </Link>
        <nav>
          <Link to={pagePathnames.catalog} className="header-link">
            shop
          </Link>
          <Link to={pagePathnames.about} className="header-link">
            about
          </Link>
        </nav>
      </div>
      <div className="user-links">
        <Link to={pagePathnames.user} className="user-link link">
          <img src={userIcon} alt="user-icon" />
          <p className="user-name"> user name</p>
        </Link>
        <div className="vertical-line"></div>
        <Link to={pagePathnames.basket} className="link">
          <img className="logo-link" src={basketIcon} alt="basket-icon" />
        </Link>
        <div className="barge">3</div>
      </div>
    </header>
  );
};
