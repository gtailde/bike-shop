import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { Button } from 'components/UI/Button/Button';
import { pagePathnames } from 'router/pagePathnames';

export const Error = () => {
  return (
    <section className="error-section">
      <h1 className="error-header"> 404 Error </h1>
      <h3 className="error-text">The page you were looking for counldn&apos;t be found.</h3>
      <Link to={pagePathnames.main}>
        <Button accent> Back to main page </Button>
      </Link>
    </section>
  );
};
