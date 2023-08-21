import * as yup from 'yup';
import { type CountryName, countriesNames } from './countriesList';

export const emailSchema = yup
  .string()
  .strict()
  .trim()
  .email('Email format is not valid')
  .required('Email is required');

export const passwordSchema = yup
  .string()
  .strict()
  .trim()
  .required('Password is required')
  .matches(/^\S*$/, {
    message: 'Password must not contain whitespace',
    excludeEmptyString: true,
  })
  .matches(/^(?=.*[A-Z]).*$/, {
    message: 'Password must have at least one uppercase Character',
    excludeEmptyString: true,
  })
  .matches(/^(?=.*[a-z]).*$/, {
    message: 'Password must have at least one lowercase Character',
    excludeEmptyString: true,
  })
  .matches(/^(?=.*[0-9]).*$/, {
    message: 'Password must contain at least one digit',
    excludeEmptyString: true,
  })
  .matches(/^(?=.*[!@#$%^&*]).*$/, {
    message: 'Password must contain at least one special character',
    excludeEmptyString: true,
  })
  .matches(/^.{8,24}$/, {
    message: 'Password must be 8-24 characters Long',
    excludeEmptyString: true,
  });

const characterSchema = yup
  .string()
  .required()
  .matches(/^(?=.*[a-zA-Z]).*$/, {
    message: 'Must contain at least one character',
    excludeEmptyString: true,
  });

const onlyCharactersSchema = yup
  .string()
  .required()
  .matches(/^(?=.*[a-zA-Z]).*$/, {
    message: 'Must contain at least one character',
    excludeEmptyString: true,
  })
  .matches(/^(?!.*\d)[^!@#$%^&*]+$/, {
    message: 'Must contain no special characters or numbers',
    excludeEmptyString: true,
  });

export const dateSchema = yup
  .string()
  .matches(
    /^(((0[1-9]|[12][0-9]|30)[-/]?(0[13-9]|1[012])|31[-/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/]?[0-9]{4}|29[-/]?02[-/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$/,
    {
      message: 'Date format must be dd.mm.yyyy',
      excludeEmptyString: true,
    },
  );

export const userNameSchema = onlyCharactersSchema;
export const titleSchema = yup.string().required();
export const citySchema = onlyCharactersSchema;
export const streetSchema = characterSchema;
export const countrySchema = yup
  .mixed((inputText: string): inputText is CountryName => countriesNames.includes(inputText))
  .required();
