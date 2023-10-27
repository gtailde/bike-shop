import { createContext } from 'react';
import { type ICart, type ICustomer } from 'types/types';

export const UserContext = createContext<{
  profileInfo?: ICustomer;
  isUserLoggedIn?: boolean;
  setIsUserLoggedIn?: React.Dispatch<React.SetStateAction<boolean>>;
  cart?: ICart;
  setCart?: React.Dispatch<React.SetStateAction<ICart | undefined>>;
}>({});
