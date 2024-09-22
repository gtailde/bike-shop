import React, { type FC } from 'react';
import { Navigate } from 'react-router-dom';
import { type ChildrenProps } from './types';
import { pagePathnames } from 'router/pagePathnames';

const CheckAuth: FC<ChildrenProps> = ({ children }) => {
  const user = localStorage.getItem('access_token');

  if (user) {
    return <Navigate to={pagePathnames.main} />;
  }

  return children;
};

export { CheckAuth };
