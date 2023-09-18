export const getRandomInt = (min: number, max: number): number => {
  if (!max) {
    return Math.round(Math.random() * min);
  }

  const intMin = Math.floor(min);
  const intMax = Math.floor(max);
  return intMin + Math.round(Math.random() * (intMax - intMin));
};

export const getRandomFloat = (min: number, max: number, digits = 2): number => {
  if (!max) {
    return Number((Math.random() * min).toFixed(digits));
  }

  return Number((min + Math.random() * (max - min)).toFixed(digits));
};
