import './style.scss';
import React from 'react';
import { Button } from 'components/UI/Button/Button';
import { ReactComponent as CartIcon } from './assets/basket.svg';
import { type IProductData } from '../Filter/types';
import { useNavigate } from 'react-router-dom';
import { pagePathnames } from 'router/pagePathnames';
import { transformPriceText } from './helpers';

export const ProductCard = ({
  id,
  titleImage,
  name,
  description,
  oldPrice,
  newPrice,
}: IProductData) => {
  const navigate = useNavigate();

  return (
    <article className="product-card">
      <div className="product-card__slider slider">
        <img className="slider__image" src={titleImage} alt="" />
        <div className="slider__dots">
          <span className="slider__dot"></span>
          <span className="slider__dot slider__dot--current"></span>
          <span className="slider__dot"></span>
        </div>
      </div>
      <div className="product-card__text-content">
        <h1 className="product-card__name">{name}</h1>
        <p className="product-card__description">{description}</p>
        <span className="product-card__price">
          <span className="product-card__new-price">{transformPriceText(newPrice)}</span>
          <span className="product-card__old-price">{transformPriceText(oldPrice)}</span>
        </span>
        <Button
          accent
          className="product-card__cart-button button--w-icon"
          onClick={() => {
            navigate(`${pagePathnames.catalog}/${id}`);
          }}
        >
          <CartIcon />
        </Button>
      </div>
    </article>
  );
};
