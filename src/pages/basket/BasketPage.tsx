import { Basket } from 'components/blocks/Basket/Basket';
import React from 'react';

export const BasketPage = () => {
  return (
    <main className="page-content">
      <h1 className="visually-hidden">Catalog product page</h1>
      <Basket />
    </main>
  );
};
