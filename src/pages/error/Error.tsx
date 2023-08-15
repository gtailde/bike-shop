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
    <section className="error-section">
      <h1 className="error-header"> 404 Error </h1>
      <h3 className="error-text">The page you were looking for counldn&apos;t be found.</h3>
      <Button accent onClick={toMain}>
        Back to main page
      </Button>
    </section>
  );
};
