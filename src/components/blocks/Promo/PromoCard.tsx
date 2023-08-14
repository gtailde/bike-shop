import React from 'react';
import { Link } from 'react-router-dom';
import { pagePathnames } from 'router/pagePathnames';
import { type IPromoCardData } from './types';
import decorativeIcon1 from './assets/promo-decorative-1.svg';
import decorativeIcon2 from './assets/promo-decorative-2.svg';
import decorativeBackground1 from './assets/promo-background-1.png';
import decorativeBackground2 from './assets/promo-background-2.png';

interface IDecorateVariant {
  decorativeIcon: string;
  decorativeBackground: string;
}

interface PromoCardProps {
  promoCardData: IPromoCardData;
  variantIndex?: number;
}

const decorateVariants: IDecorateVariant[] = [
  { decorativeIcon: decorativeIcon1, decorativeBackground: decorativeBackground1 },
  { decorativeIcon: decorativeIcon2, decorativeBackground: decorativeBackground2 },
];

export function PromoCard({ promoCardData, variantIndex = 0 }: PromoCardProps) {
  const { name, description, code } = promoCardData;
  const decorateSet = decorateVariants[variantIndex % decorateVariants.length];

  return (
    <article
      className="promo-card"
      style={{ backgroundImage: `url(${decorateSet.decorativeBackground})` }}
    >
      <h1 className="visually-hidden">Promo-card</h1>
      <img className="promo-card__decorative-img" src={decorateSet.decorativeIcon} alt="" />
      <div className="promo-card__description">
        <p className="promo-card__discount-name">{name}</p>
        <p className="promo-card__discount-description">{description}</p>
        <p className="promo-card__code">Use Code: {code}</p>
      </div>
      <Link to={pagePathnames.catalog} className="promo-card__shop-link">
        Shop now!
      </Link>
    </article>
  );
}
