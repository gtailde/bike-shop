import React, { type FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { type ChildrenProps } from './types';
import { pagePathnames } from 'router/pagePathnames';

const CheckAuth: FC<ChildrenProps> = ({ children }) => {
  const { user } = useAuth();

  if (user != null && user.length > 0) {
    return <Navigate to={pagePathnames.main} />;
  }

  return children;
};

export { CheckAuth };
