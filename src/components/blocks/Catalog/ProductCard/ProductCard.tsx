import './style.scss';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'components/UI/Button/Button';
import { ReactComponent as CartIcon } from './assets/basket.svg';
import { useNavigate } from 'react-router-dom';
import { transformPriceText } from '../../../../helpers/formatText';
import { type IProductDetails } from 'types/types';
import { Price } from 'components/UI/Price/Price';
import basketAPI from 'API/BasketAPI';
import { UserContext } from 'store/userContext';

export const ProductCard = ({
  id,
  titleImage,
  name,
  description,
  price,
  discountPrice,
}: IProductDetails) => {
  const DEFAULT_VARIANT_ID = 1;
  const DEFAULT_PRODUCT_QUANTITY = 1;
  const [isProductInCart, setIsProductInCart] = useState(false);
  const { cart, setCart } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setIsProductInCart(!!checkProductAvailabilityInCart());
  }, [cart]);

  const checkProductAvailabilityInCart = () =>
    cart?.lineItems.find((item) => item.productId === id);

  const onCartClick = async (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.stopPropagation();
    const newCart = await basketAPI.addToCart(id, DEFAULT_VARIANT_ID, DEFAULT_PRODUCT_QUANTITY);
    if (newCart) setCart?.(newCart);
  };

  return (
    <article
      className="product-card"
      onClick={() => {
        navigate(`${id}`);
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
          accent={!isProductInCart}
          disabled={isProductInCart}
          className="product-card__cart-button button--w-icon"
          onClick={onCartClick}
        >
          <CartIcon />
        </Button>
      </div>
    </article>
  );
};
