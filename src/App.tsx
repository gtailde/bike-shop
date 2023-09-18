import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/App.scss';
import AppRouter from 'router/AppRouter';
import { Header } from 'components/header/Header';
import { Footer } from 'components/footer/Footer';
import { ToastContainer } from 'react-toastify';
import { type ICart, type ICustomer } from 'types/types';
import { customersApi } from 'API/CustomersAPI';
import basketAPI from 'API/BasketAPI';

export const UserContext = createContext<{
  profileInfo?: ICustomer;
  cart?: ICart;
  setCart?: React.Dispatch<React.SetStateAction<ICart | undefined>>;
}>({});

function App() {
  const [profileInfo, setProfileInfo] = useState<ICustomer>();
  const [cart, setCart] = useState<ICart>();

  useEffect(() => {
    void getCustomerData();
  }, []);

  const getCustomerData = async () => {
    try {
      const customer = await customersApi.getCustomer();
      if ('id' in customer) {
        setProfileInfo(customer);
        setCart(await basketAPI.getActiveCart());
      }
    } catch (error) {
      console.log('Anonymous session started');
    }
  };

  return (
    <UserContext.Provider value={{ profileInfo, cart, setCart }}>
      <BrowserRouter>
        <Header />
        <AppRouter />
        <ToastContainer autoClose={2000} hideProgressBar />
        <Footer />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
