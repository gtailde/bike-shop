import './style.scss';
import React from 'react';
import { PromoCard } from './PromoCard';
import { type IPromoCardData } from './types';

// FETCHED DATA
const promoCardData: IPromoCardData[] = [
  {
    id: 1,
    name: "Holiday's Offer!",
    description: 'Sale 50% Off',
    code: 'Holi50',
  },
  {
    id: 2,
    name: "Crosscheck's Offer!",
    description: 'Sale 35% Off',
    code: 'Check35',
  },
];

export const Promo = () => {
  const promoCardItems = promoCardData.map((data, index) => (
    <li key={data.id} className="promo__card-item">
      <PromoCard promoCardData={data} variantIndex={index} />
    </li>
  ));

  return (
    <section className="promo">
      <h2 className="visually-hidden">Promo</h2>
      <div className="page-wrapper">
        <ul className="promo__card-list">{promoCardItems}</ul>
      </div>
    </section>
  );
};
