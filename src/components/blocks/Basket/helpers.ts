import { type ICart, type ICentPrecisionMoney } from 'types/types';

export const getPriceFromCentAmount = (
  value: ICentPrecisionMoney,
  formatter: (price: number) => string,
) => {
  const result = formatter(value.centAmount / 10 ** value.fractionDigits);
  let currencyCode = '';
  switch (value.currencyCode) {
    case 'EUR':
      currencyCode = '€';
      break;
    case 'USD':
      currencyCode = '$';
      break;
    default:
      currencyCode = '';
  }

  return `${currencyCode}${result}`;
};

// Расчет суммы без скидки корзины, но с возможной скидкой на отдельный товар
export const getSubtotal = (userCart?: ICart): number => {
  if (!userCart) {
    return 0;
  }

  const items = userCart.lineItems;
  return items.reduce(
    (sum, item) =>
      sum +
      (item.price.discounted.value.centAmount / 10 ** item.price.discounted.value.fractionDigits) *
        item.quantity,
    0,
  );
};

// Расчет объема скидки корзины
export const getTotalCartDiscountAmount = (userCart?: ICart): number => {
  if (!userCart) {
    return 0;
  }

  const items = userCart.lineItems;
  return items.reduce(
    (sum, item) =>
      sum +
      (item.discountedPrice?.includedDiscounts
        ? Number(
            item.discountedPrice.includedDiscounts.reduce(
              (acc, discount) => Number(acc) + Number(discount.discountedAmount.centAmount),
              0,
            ) /
              10 ** item.discountedPrice.value.fractionDigits,
          ) * item.quantity
        : 0),
    0,
  );
};
