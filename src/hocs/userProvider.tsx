import React, { type FC, useState, useEffect } from 'react';
import basketAPI from 'API/BasketAPI';
import { customersApi } from 'API/CustomersAPI';
import { UserContext } from 'store/userContext';
import { type ICart, type ICustomer } from 'types/types';
import { type ChildrenProps } from './types';

export const UserProvider: FC<ChildrenProps> = ({ children }) => {
  const [profileInfo, setProfileInfo] = useState<ICustomer>();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [cart, setCart] = useState<ICart>();

  useEffect(() => {
    void getCustomerData();
  }, [isUserLoggedIn]);

  const getCustomerData = async () => {
    try {
      setProfileInfo(undefined);
      setCart((await basketAPI.getActiveCart()) ?? undefined);

      const customer = await customersApi.getCustomer();
      if ('id' in customer) {
        setProfileInfo(customer);
        setIsUserLoggedIn(true);
      }
    } catch (error) {
      console.log('Anonymous session started');
    }
  };

  return (
    <UserContext.Provider value={{ profileInfo, isUserLoggedIn, setIsUserLoggedIn, cart, setCart }}>
      {children}
    </UserContext.Provider>
  );
};
