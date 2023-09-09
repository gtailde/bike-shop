import './style.scss';
import { Button } from 'components/UI/Button/Button';
import { TextField } from 'components/UI/TextField/TextField';
import { ReactComponent as DeleteIcon } from './assets/delete-icon.svg';
import React from 'react';

import img1 from './assets/mock_photo-1.png';
import { Counter } from 'components/UI/Counter/Counter';

export const Basket = () => {
  return (
    <section className="cart">
      <div className="cart__content page-wrapper">
        <h2 className="cart__title">Cart</h2>
        <div className="cart__items-in-cart">
          <p className="cart__product-list-header">Items in cart (3)</p>
          <ul className="cart__product-list">
            <li className="cart__product-item">
              <div className="cart__cart-product-card cart-product-card">
                <div className="cart-product-card__image-column">
                  <img src={img1} alt="" />
                </div>
                <div className="cart-product-card__description-column">
                  <div className="cart-product-card__text">
                    <h3 className="cart-product-card__name">Cube Cross Race C:68X ...</h3>
                    <dl className="cart-product-card__product-options">
                      <dt>Size:</dt>
                      <dd>M</dd>
                      <dt>Color:</dt>
                      <dd>Black</dd>
                    </dl>
                  </div>
                  <p className="cart-product-card__price">
                    <span className="cart-product-card__base-price">$1 899.00</span>
                    <span className="cart-product-card__discount-price">$2 199.00</span>
                  </p>
                  <Counter className="cart-product-card__counter" />
                  <p className="cart-product-card__total-price">3 798.00</p>
                  <Button className="address-record__button button--icon-only" aria-label="Delete">
                    <DeleteIcon className="icon" />
                  </Button>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="order-summary">
          <h3 className="order-summary__title">Order Summary</h3>
          <div className="order-summary__promo-code">
            <TextField
              className="order-summary__code-input"
              label={'Enter promo code'}
              name={'promo-code'}
            />
            <Button>Apply</Button>
          </div>
          <table className="order-summary__total">
            <tr>
              <td>Sub Total</td>
              <td>$3 798.00</td>
            </tr>
            <tr>
              <td>Discount</td>
              <td>$498.00</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>$3 398.00</td>
            </tr>
          </table>
        </div>
        <Button className="cart__checkout-button">Checkout</Button>
      </div>
    </section>
  );
};
