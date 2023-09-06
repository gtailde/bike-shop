import React, { type FC, type ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { pagePathnames } from 'router/pagePathnames';
import { type IPromoCardData } from './types';
import { ReactComponent as DecorativeIcon1 } from './assets/promo-decorative-1.svg';
import { ReactComponent as DecorativeIcon2 } from './assets/promo-decorative-2.svg';
import decorativeBackground1 from './assets/promo-background-1.png';
import decorativeBackground2 from './assets/promo-background-2.png';

interface IDecorateVariant {
  decorativeIcon: ReactElement;
  decorativeBackground: string;
}

interface IPromoCardProps {
  promoCardData: IPromoCardData;
  variantIndex?: number;
}

const decorateVariants: IDecorateVariant[] = [
  {
    decorativeIcon: <DecorativeIcon1 />,
    decorativeBackground: decorativeBackground1,
  },
  { decorativeIcon: <DecorativeIcon2 />, decorativeBackground: decorativeBackground2 },
];

export const PromoCard: FC<IPromoCardProps> = ({ promoCardData, variantIndex = 0 }) => {
  const { name, description, code } = promoCardData;
  const decorateSet = decorateVariants[variantIndex % decorateVariants.length];

  return (
    <article
      className="promo-card"
      style={{ backgroundImage: `url(${decorateSet.decorativeBackground})` }}
    >
      <h1 className="visually-hidden">Promo-card</h1>
      {decorateSet.decorativeIcon}
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
};
