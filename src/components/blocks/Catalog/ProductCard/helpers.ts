export const transformPriceText = (price: number, divider = ' ', digits = 2): string => {
  const priceString = price.toFixed(digits);
  let [intPart, floatPart] = priceString.split('.');
  intPart = intPart
    .split('')
    .reverse()
    .map((char, index) => (index % 3 === 0 && index !== 0 ? `${char + divider}` : char))
    .reverse()
    .join('');
  return [intPart, floatPart].join('.');
};
