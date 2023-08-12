import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { pagePathnames } from 'router';

export const Login = () => {
  const navigate = useNavigate();
  const { signin } = useAuth();

  const loginUser = () => {
    if (signin !== undefined)
      signin('name', () => {
        navigate(pagePathnames.MAIN, { replace: true });
      });
  };

  return (
    <div>
      <button onClick={loginUser}>Login</button>{' '}
    </div>
  );
};
