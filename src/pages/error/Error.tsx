import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import { Button } from 'components/UI/Button/Button';
import { pagePathnames } from 'router/pagePathnames';

export const Error = () => {
  const navigate = useNavigate();

  const toMain = () => {
    navigate(pagePathnames.main);
  };

  return (
    <main className="page-content">
      <section className="error-section">
        <div className="error-section__content page-wrapper">
          <h2 className="error-section__header"> 404 Error </h2>
          <p className="error-section__text">
            The page you were looking for counldn&apos;t be found.
          </p>
          <Button accent className="error-section__button" onClick={toMain}>
            Back to main page
          </Button>
        </div>
      </section>
    </main>
  );
};
