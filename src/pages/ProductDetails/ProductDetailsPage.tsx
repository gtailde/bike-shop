import React from 'react';
import { useParams } from 'react-router-dom';

export const ProductDetailsPage = () => {
  const params = useParams();
  return (
    <main className="page-content">
      <section className="product-details">
        <div className="product-details__content page-wrapper">
          <div className="product">{`Product details [id]: ${params.id ?? ''}`}</div>
        </div>
      </section>
    </main>
  );
};
