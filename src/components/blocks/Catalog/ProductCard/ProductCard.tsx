import './style.scss';
import React from 'react';
import { Button } from 'components/UI/Button/Button';
import { ReactComponent as CartIcon } from './assets/basket.svg';
import { useNavigate } from 'react-router-dom';
import { pagePathnames } from 'router/pagePathnames';
import { transformPriceText } from './helpers';
import { type IProductDetails } from 'types/types';
import { Price } from 'components/UI/Price/Price';

export const ProductCard = ({
  id,
  titleImage,
  name,
  description,
  price,
  discountPrice,
}: IProductDetails) => {
  const navigate = useNavigate();

  return (
    <article
      className="product-card"
      onClick={() => {
        navigate(`${pagePathnames.catalog}/${id}`);
      }}
    >
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
        <Price
          className="product-card__price"
          price={price}
          discountPrice={discountPrice}
          formatter={transformPriceText}
        />
        <Button
          accent
          className="product-card__cart-button button--w-icon"
          onClick={(evt) => {
            evt.stopPropagation();
          }}
        >
          <CartIcon />
        </Button>
      </div>
    </article>
  );
};
