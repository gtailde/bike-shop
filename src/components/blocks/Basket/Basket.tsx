import './style.scss';
import React, { useContext, useRef, useState } from 'react';
import { Button } from 'components/UI/Button/Button';
import { TextField } from 'components/UI/TextField/TextField';
import { ReactComponent as DeleteIcon } from './assets/delete-icon.svg';
import noImagePlaceholder from './assets/no-image-placeholder.png';
import { ReactComponent as BagIcon } from './assets/bag-icon.svg';
import { Counter } from 'components/UI/Counter/Counter';
import { pagePathnames } from 'router/pagePathnames';
import { Link } from 'react-router-dom';
import { getPriceFromCentAmount, getSubtotal, getTotalCartDiscountAmount } from './helpers';
import { transformPriceText } from 'helpers/formatText';
import basketAPI from 'API/BasketAPI';
import { UserContext } from 'store/userContext';

export const Basket = () => {
  const { cart, setCart } = useContext(UserContext);
  const couponField = useRef<HTMLInputElement>(null);
  const [isCouponFieldEmpty, setIsCouponFieldEmpty] = useState(true);
  const isCartEmpty = !cart?.lineItems.length;
  const OPTIONS_TO_SHOW = ['Size', 'Color'];

  const handleClearCart = async () => {
    const newCart = await basketAPI.clearCart();
    if (newCart) setCart?.(newCart);
  };

  const handleChangeQuantity = async (itemId: string, quantity: number) => {
    const newCart = await basketAPI.changeQuantity(itemId, quantity);
    if (newCart) setCart?.(newCart);
  };

  const handleDeleteItem = async (itemId: string) => {
    const newCart = await basketAPI.removeFromCart(itemId);
    if (newCart) setCart?.(newCart);
  };

  const handleApplyCoupon = async () => {
    if (couponField.current) {
      const newCart = await basketAPI.addDiscountCode(couponField.current.value);
      if (newCart) setCart?.(newCart);
      couponField.current.value = '';
      setIsCouponFieldEmpty(true);
    }
  };

  const onCouponFieldChange = () => setIsCouponFieldEmpty(!couponField.current?.value);

  if (isCartEmpty) {
    return (
      <section className="cart">
        <div className="cart__content page-wrapper">
          <h2 className="cart__title">Cart</h2>
          <div className="cart__empty-cart">
            <BagIcon className="cart__empty-cart-image" />
            <p className="cart__empty-cart-title">Your cart is currently empty</p>
            <p className="cart__empty-cart-text">
              Before proceed to checkout, you must add some products to your cart. <br></br> You
              will find a lot of interesting products on our Shop page.
            </p>
            <Link to={pagePathnames.catalog} className="link link--button-like link--accent">
              Back to Shop
            </Link>
          </div>
        </div>
      </section>
    );
  } else {
    const totalItemsCount = cart?.lineItems.reduce((acc, lineItem) => acc + lineItem.quantity, 0);

    return (
      <section className="cart">
        <div className="cart__content page-wrapper">
          <h2 className="cart__title">Cart</h2>
          <div className="cart__items-in-cart">
            <div className="cart__product-list-headline">
              <p className="cart__product-list-header">Items in cart ({totalItemsCount})</p>
              <Button onClick={handleClearCart} className="button--wo-borders">
                Clear Cart
              </Button>
            </div>
            <ul className="cart__product-list">
              {cart?.lineItems.map((lineItem) => {
                const options: Array<{ name: string; value: string }> = [];
                OPTIONS_TO_SHOW.forEach((opt) => {
                  const match = lineItem.variant.attributes.find((att) => att.name === opt);
                  if (match) {
                    const value = typeof match.value === 'object' ? match.value.label : match.value;
                    options.push({ name: match.name, value });
                  }
                });

                return (
                  <li key={lineItem.id} className="cart__product-item">
                    <div className="cart__cart-product-card cart-product-card">
                      <div className="cart-product-card__image-column">
                        <img src={lineItem.variant.images[0]?.url ?? noImagePlaceholder} alt="" />
                      </div>
                      <div className="cart-product-card__description-column">
                        <div className="cart-product-card__text">
                          <h3 className="cart-product-card__name">{lineItem.name['en-US']}</h3>
                          <dl className="cart-product-card__product-options">
                            {options.map((option) => (
                              <span
                                className="cart-product-card__product-option-group"
                                key={option.name}
                              >
                                <dt>{option.name}:</dt>
                                <dd>{option.value}</dd>
                              </span>
                            ))}
                          </dl>
                        </div>
                        <p className="cart-product-card__price">
                          <span className="cart-product-card__discount-price">
                            {getPriceFromCentAmount(
                              lineItem.price.discounted.value,
                              transformPriceText,
                            )}
                          </span>
                          <span className="cart-product-card__base-price">
                            {getPriceFromCentAmount(lineItem.price.value, transformPriceText)}
                            <span className="cart-product-card__count"> x {lineItem.quantity}</span>
                          </span>
                        </p>
                        <Counter
                          initValue={lineItem.quantity}
                          onChangeValue={handleChangeQuantity.bind(null, lineItem.id)} // !!!FIX
                          className="cart-product-card__counter"
                        />
                        <p className="cart-product-card__total-price">
                          {getPriceFromCentAmount(lineItem.totalPrice, transformPriceText)}
                        </p>
                        <Button
                          onClick={() => {
                            void handleDeleteItem(lineItem.id);
                          }}
                          className="cart-product-card__delete-button button--icon-only"
                          aria-label="Delete"
                        >
                          <DeleteIcon className="icon" />
                        </Button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="order-summary">
            <h3 className="order-summary__title">Order Summary</h3>
            <div className="order-summary__promo-code">
              <TextField
                ref={couponField}
                onChange={onCouponFieldChange}
                className="order-summary__code-input"
                label={'Enter promo code'}
                name={'promo-code'}
              />
              <Button onClick={handleApplyCoupon} disabled={isCouponFieldEmpty}>
                Apply
              </Button>
            </div>
            <table className="order-summary__total">
              <tbody>
                <tr>
                  <td>Sub Total</td>
                  <td>${transformPriceText(getSubtotal(cart))}</td>
                </tr>
                <tr>
                  <td>Discount</td>
                  <td>${transformPriceText(getTotalCartDiscountAmount(cart))}</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td>
                    {cart?.totalPrice
                      ? getPriceFromCentAmount(cart.totalPrice, transformPriceText)
                      : ''}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Button accent className="cart__checkout-button">
            Checkout
          </Button>
        </div>
      </section>
    );
  }
};
