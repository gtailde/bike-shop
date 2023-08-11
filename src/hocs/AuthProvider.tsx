import React, { createContext, useState, type FC } from 'react';
import { type ChildrenProps } from './types';

type User = null | string;

interface IUserLogin {
  user: User;
  signin?: (newUser: User, callback: () => void) => void;
  signout?: (callback: () => void) => void;
}

export const AuthContext = createContext<IUserLogin>({ user: null });
console.log(localStorage.getItem('userName'));

export const AuthProvider: FC<ChildrenProps> = ({ children }) => {
  const [user, setUser] = useState<User>(localStorage.getItem('userName'));

  const signin = (newUser: User, callback: () => void) => {
    setUser(newUser);
    if (newUser != null) localStorage.setItem('userName', newUser);
    callback();
  };
  const signout = (callback: () => void) => {
    setUser(null);
    localStorage.removeItem('userName');
    callback();
  };

  const value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
