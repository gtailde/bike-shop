import { Login } from 'components/blocks/Login/Login';
import React from 'react';

export const LoginPage = () => {
  // const navigate = useNavigate();
  // const { signin } = useAuth();

  // const loginUser = () => {
  //   if (signin !== undefined)
  //     signin('name', () => {
  //       navigate(pagePathnames.main, { replace: true });
  //     });
  // };

  return (
    <main className="page-content">
      <h1 className="visually-hidden">Login page</h1>
      <Login />
    </main>
  );
};
