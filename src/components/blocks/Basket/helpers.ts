import { type ICentPrecisionMoney } from 'types/types';

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
