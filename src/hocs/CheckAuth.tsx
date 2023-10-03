import React, { useContext, type FC } from 'react';
import { Navigate } from 'react-router-dom';
import { type ChildrenProps } from './types';
import { pagePathnames } from 'router/pagePathnames';
import { UserContext } from 'store/userContext';

const CheckAuth: FC<ChildrenProps> = ({ children }) => {
  const { isUserLoggedIn } = useContext(UserContext);

  if (isUserLoggedIn) {
    return <Navigate to={pagePathnames.main} />;
  }

  return children;
};

export { CheckAuth };
