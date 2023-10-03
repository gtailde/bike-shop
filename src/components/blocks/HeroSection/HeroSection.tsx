import './style.scss';
import React, { useContext } from 'react';
import { Button } from 'components/UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import { pagePathnames } from 'router/pagePathnames';
import { UserContext } from 'store/userContext';
import { updateCustomersAPI } from 'API/UpdateCustomerAPI';

export const HeroSection = () => {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogIn = () => {
    navigate(pagePathnames.login);
  };

  const handleLogOut = async () => {
    await updateCustomersAPI.logoutCustomer('access_token');
    setIsUserLoggedIn?.(false);
    navigate(pagePathnames.login);
  };

  const handleSignUp = () => {
    navigate(pagePathnames.registration);
  };

  return (
    <section className="hero-section">
      <h2 className="visually-hidden">Shop poster</h2>
      <div className="hero-section__container page-wrapper">
        <p className="hero-section__title">We raise the bar for what a bike should be</p>
        <p className="hero-section__descrption">
          Unbeatable choice and great value from the world&apos;s best bike brands. Get the latest
          news, and exclusive offers.
        </p>
        {isUserLoggedIn ? (
          <Button accent onClick={handleLogOut}>
            Log out
          </Button>
        ) : (
          <div className="hero-section__buttons-container">
            <Button accent onClick={handleLogIn}>
              Log In
            </Button>
            <Button accent onClick={handleSignUp}>
              Sign Up
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
