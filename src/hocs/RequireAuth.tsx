import React, { type FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { type ChildrenProps } from './types';
import { pagePathnames } from 'router';

const RequireAuth: FC<ChildrenProps> = ({ children }) => {
  const { user } = useAuth();

  if (user === null) {
    return <Navigate to={pagePathnames.LOGIN} />;
  }

  return children;
};

export { RequireAuth };
