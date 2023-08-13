import React, { type FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { type ChildrenProps } from './types';
import { pagePathnames } from 'router/pagePathnames';

const RequireAuth: FC<ChildrenProps> = ({ children }) => {
  const { user } = useAuth();

  if (user === null) {
    return <Navigate to={pagePathnames.login} />;
  }

  return children;
};

export { RequireAuth };
