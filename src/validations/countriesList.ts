export const countriesNames = [
  'Germany',
  'US',
  'Australia',
  'Spain',
  'Russia',
  'Belarus',
  'Ukraine',
];

export type CountryName =
  | 'Germany'
  | 'US'
  | 'Australia'
  | 'Spain'
  | 'Russia'
  | 'Belarus'
  | 'Ukraine';

type Country = Readonly<{
  name: CountryName;
  postalCode: RegExp;
}>;

type Countries = readonly Country[];

export const countries: Countries = [
  {
    name: 'Germany',
    postalCode:
      /\b((?:0[1-46-9]\d{3})|(?:[1-357-9]\d{4})|(?:[4][0-24-9]\d{3})|(?:[6][013-9]\d{3}))\b/,
  },
  {
    name: 'US',
    postalCode: /^\d{5}([-]?\d{4})?$/,
  },
  {
    name: 'Australia',
    postalCode:
      /^(0[289][0-9]{2})|([1345689][0-9]{3})|(2[0-8][0-9]{2})|(290[0-9])|(291[0-4])|(7[0-4][0-9]{2})|(7[8-9][0-9]{2})$/,
  },
  {
    name: 'Spain',
    postalCode: /^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$/,
  },
  {
    name: 'Russia',
    postalCode: /\d{6}/,
  },
  {
    name: 'Belarus',
    postalCode: /\d{5}[-]?\d{3}/,
  },
  {
    name: 'Ukraine',
    postalCode: /\d{5}/,
  },
];
