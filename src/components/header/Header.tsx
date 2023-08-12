import React, { type FC } from 'react';
import './style.scss';
import headerLogo from './assets/logo.svg';
import headerLogoText from './assets/logo-text.svg';
import userIcon from './assets/user-icon.svg';
import basketIcon from './assets/basket.svg';
import { Link } from 'react-router-dom';
import { pagePathnames } from 'router';
import CustomLink from 'components/UI/custom-link/CustomLink';

const Header: FC = () => {
  return (
    <header>
      <div className="links">
        <Link to={pagePathnames.MAIN} className="logo-link">
          <img className="header-logo" src={headerLogo} alt="header-icon" />
          <img className="header-logo-text" src={headerLogoText} alt="header-icon" />
        </Link>
        <nav>
          <CustomLink
            path={pagePathnames.CATALOG}
            classNames={['header-link']}
            textContent="shop"
          ></CustomLink>
          <CustomLink
            path={pagePathnames.ABOUT}
            classNames={['header-link']}
            textContent="about"
          ></CustomLink>
        </nav>
      </div>
      <div className="user-links">
        <Link to={pagePathnames.USER_PROFILE} className="user-link link">
          <img src={userIcon} alt="user-icon" />
          <p className="user-name"> user name</p>
        </Link>
        <div className="vertical-line"></div>
        <Link to={pagePathnames.BASKET} className="link">
          <img src={basketIcon} alt="basket-icon logo-link" />
        </Link>
        <div className="barge">3</div>
      </div>
    </header>
  );
};

export default Header;
