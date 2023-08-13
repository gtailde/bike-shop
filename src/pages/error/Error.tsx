import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import { AccentButton } from 'components/UI/buttons/accent-button/AccentButton';
import { pagePathnames } from 'router/pagePathnames';

export const Error = () => {
  return (
    <section className="error-section">
      <h1 className="error-header"> 404 Error </h1>
      <h3 className="error-text">The page you were looking for counldn&apos;t be found.</h3>
      <Link to={pagePathnames.main}>
        <AccentButton className=""> Back to main page </AccentButton>
      </Link>
    </section>
  );
};
