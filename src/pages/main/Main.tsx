import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { pagePathnames } from 'router/pagePathnames';

export const Main = () => {
  const navigate = useNavigate();
  const { signout } = useAuth();

  const logoutUser = () => {
    if (signout !== undefined)
      signout(() => {
        navigate(pagePathnames.login, { replace: true });
      });
  };

  return (
    <div>
      <h1> Main </h1>
      <Link to={pagePathnames.login}> LOGIN </Link>
      <button onClick={logoutUser}> LOGOUT </button>
    </div>
  );
};
