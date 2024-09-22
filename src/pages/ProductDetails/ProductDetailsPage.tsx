import React from 'react';
import { ProductDetails } from 'components/blocks/ProductDetails/ProductDetails';

export const ProductDetailsPage = () => {
  return (
    <main className="page-content">
      <h1 className="visually-hidden">Product details page</h1>
      <ProductDetails />
    </main>
  );
};
